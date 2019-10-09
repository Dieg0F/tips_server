import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Constants } from '../utils/constants';
import { NotificationBuilder } from '../utils/notification-builder';
import { NotificationSender } from '../utils/notification-sender';
import { profileParse } from '../model/profile';
import { avaliationParse } from '../model/avaliation';

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

function avaliationHandler(data: any) {

    if (data !== undefined) {
        console.log("Avaliation Functions | Requesting Evaluator Profile!");
        const avaliation = avaliationParse(data);

        return admin.firestore().doc(Constants.PROFILES_COLLECTION + avaliation.evaluatorUid).get()
            .then(async (pfEvaluatorSnap: any) => {
                const pfEvaluator = profileParse(pfEvaluatorSnap.data());

                console.log("Avaliation Functions | Requesting All Rated Avaliations!");
                return admin.firestore().collection(Constants.AVALIATIONS_COLLECTION).where("ratedUid", "==", avaliation.ratedUid).get()
                    .then(async (avaliationsSnap: any) => {
                        console.log("Avaliation Functions | All Avaliations from Rated User");

                        var userTotalRate = 0;
                        var userAvaliationsCount = 0;
                        var userMinRate = 0;
                        var userMaxRate = 0;

                        console.log("Avaliation Functions | Building User new Rate.");
                        avaliationsSnap.forEach(async (el: any) => {
                            var aval = avaliationParse(el.data());
                            userTotalRate += aval.rate;
                            userAvaliationsCount++;
                            if (userMaxRate <= aval.rate) {
                                userMaxRate = aval.rate;
                            }
                            if (userMinRate >= aval.rate) {
                                userMinRate = aval.rate;
                            }
                        })

                        console.log("Avaliation Functions | Requesting Rated Profile!");
                        return admin.firestore().doc(Constants.PROFILES_COLLECTION + avaliation.ratedUid).get()
                            .then(async (pfRatedSnap: any) => {
                                var pfRated = profileParse(pfRatedSnap.data());
                                console.log("Avaliation Functions | Profile to update: ", pfRated);

                                console.log("Avaliation Functions | New Lowest rate!");
                                pfRated.userMaxRate = userMaxRate;

                                console.log("Avaliation Functions | New Highest rate!");
                                pfRated.userMinRate = userMinRate;

                                console.log("Avaliation Functions | Updating ", pfRated.name.firstName, "avaliations count and user rate!");
                                pfRated.avaliationsCount = userAvaliationsCount;
                                pfRated.userRate = userTotalRate / userAvaliationsCount;

                                console.log("Avaliation Functions | Updating profile on Database!");
                                return admin.firestore().doc(Constants.PROFILES_COLLECTION + pfRated.uid).update(pfRated)
                                    .then(() => {
                                        const payload = NotificationBuilder.createAvaliation(avaliation.uId, pfEvaluator);

                                        console.log("Avaliation Functions | Prepared to send a notification to Rated User!");
                                        return NotificationSender.sendNotification(pfRated.deviceToken, payload);
                                    })
                                    .catch((e) => {
                                        console.log("Avaliation Functions | Error on update profile!");
                                        console.log("Avaliation Functions | Error ", e);
                                        console.log("Skiping...");
                                        return null;
                                    })
                            });
                    });
            });
    } else {
        console.log("Avaliation is undefined!");
        console.log("Skiping...");
        return null;
    }
} 