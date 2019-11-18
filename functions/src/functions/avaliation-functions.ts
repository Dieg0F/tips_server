import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Constants } from '../utils/constants';
import { NotificationBuilder } from '../utils/notification-builder';
import { NotificationSender } from '../utils/notification-sender';
import { profileParse, Profile } from '../model/profile';
import { avaliationParse, Avaliation } from '../model/avaliation';
import { updateProfile } from './profile-functions';

const avaliationUidParams = "{uId}";

export function onAvaliatedCreated() {
    return functions.firestore.document(Constants.AVALIATIONS_COLLECTION + avaliationUidParams)
        .onCreate(async (snap: any) => {
            console.log("Avaliation Functions | New avaliation created!");
            avaliationHandler(snap.data());
        });
}

export function onAvaliatedUpdated() {
    return functions.firestore.document(Constants.AVALIATIONS_COLLECTION + avaliationUidParams)
        .onUpdate(async (snap: any) => {
            console.log("Avaliation Functions | Avaliation Update!");
            avaliationHandler(snap.after.data());
        });
}

export function onProfileRatedByNewAvaliation() {
    return functions.firestore.document(Constants.AVALIATIONS_COLLECTION + avaliationUidParams)
        .onCreate(async (snap: any) => {
            return profileHandler(snap.data());
        });
}

export function onProfileRatedByOldAvaliation() {
    return functions.firestore.document(Constants.AVALIATIONS_COLLECTION + avaliationUidParams)
        .onUpdate(async (snap: any) => {
            return profileHandler(snap.after.data());
        });
}

export async function setProfileRate(avaliation: Avaliation, pfRated: Profile): Promise<any> {
    console.log("Avaliation Functions | Requesting All Rated Avaliations!");
    return await admin.firestore().collection(Constants.AVALIATIONS_COLLECTION).where("ratedUid", "==", avaliation.ratedUid).get()
        .then(async (avaliationsSnap: any) => {
            console.log("Avaliation Functions | All Avaliations from Rated User");

            let userTotalRate = 0;
            let userAvaliationsCount = 0;
            let userMinRate = 0;
            let userMaxRate = 0;
            let rates: number[];
            rates = new Array<number>();
            console.log("Avaliation Functions | Building User new Rate.");

            avaliationsSnap.forEach(async (el: any) => {
                let aval = avaliationParse(el.data());
                rates.push(aval.rate);
                userTotalRate += aval.rate;
            })

            userAvaliationsCount = rates.length;
            userTotalRate = (userTotalRate / userAvaliationsCount) + userAvaliationsCount;
            userMaxRate = Math.max(...rates);
            userMinRate = Math.min(...rates);

            return await updateProfile(userMaxRate, userMinRate, userAvaliationsCount, userTotalRate, pfRated);
        })
        .catch(() => {
            console.log("Avaliation Functions | Error on update profile rate!");
            console.log("Skiping...");
            return null;
        });
}

function avaliationHandler(data: any) {

    if (data !== undefined) {
        console.log("Avaliation Functions | Requesting Evaluator Profile!");
        const avaliation = avaliationParse(data);

        return admin.firestore().doc(Constants.PROFILES_COLLECTION + avaliation.evaluatorUid).get()
            .then(async (pfEvaluatorSnap: any) => {
                const pfEvaluator = profileParse(pfEvaluatorSnap.data());
                console.log("Avaliation Functions | Profile evaluated: ", pfEvaluator);


                console.log("Avaliation Functions | Requesting Rated Profile!");
                return admin.firestore().doc(Constants.PROFILES_COLLECTION + avaliation.ratedUid).get()
                    .then(async (pfRatedSnap: any) => {
                        let pfRated = profileParse(pfRatedSnap.data());
                        console.log("Avaliation Functions | Profile rated: ", pfRated);

                        const payload = NotificationBuilder.createAvaliation(avaliation.uId, pfEvaluator);

                        console.log("Avaliation Functions | Prepared to send a notification to Rated User!");
                        return NotificationSender.sendNotification(pfRated.deviceToken, payload);
                    });
            });
    } else {
        console.log("Avaliation is undefined!");
        console.log("Skiping...");
        return null;
    }
}

function profileHandler(data: any) {
    console.log("Avaliation Functions | Avaliation Update!");
    if (data !== undefined) {
        console.log("Avaliation Functions | Requesting Evaluator Profile!");
        const avaliation = avaliationParse(data);

        console.log("Avaliation Functions | Requesting Rated Profile!");
        return admin.firestore().doc(Constants.PROFILES_COLLECTION + avaliation.ratedUid).get()
            .then(async (pfRatedSnap: any) => {
                let pfRated = profileParse(pfRatedSnap.data());
                console.log("Avaliation Functions | Profile to update: ", pfRated);

                return setProfileRate(avaliation, pfRated);
            });
    } else {
        console.log("Avaliation is undefined!");
        console.log("Skiping...");
        return null;
    }
}