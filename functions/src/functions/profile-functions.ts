import admin = require("firebase-admin");

import { Constants } from "../utils/constants";
import { profileParse, Profile } from '../model/profile';

import { Solicitation } from '../model/solicitation';
import { notifyUserOnSolicitation } from "./notifications-functions";

async function getProfilesToBuildNotification(solicitation: Solicitation, pfUidToNotify: string) {
    console.log("Profile Functions | Requesting user's profile that make the last update on this service!");
    const pfLastActionSnap = await admin.firestore().doc(Constants.PROFILES_COLLECTION + solicitation.lastActionByUserUid).get();
    const pfLastAction = profileParse(pfLastActionSnap.data());

    console.log("Profile Functions | Requesting user's profile that will receive the notification!");
    const pfToNotifySnap = await admin.firestore().doc(Constants.PROFILES_COLLECTION + pfUidToNotify).get();
    const pfToNotify = profileParse(pfToNotifySnap.data());

    var profiles = new Array<Profile>();
    profiles.push(pfLastAction);
    profiles.push(pfToNotify);

    console.log("Profile Functions | Profile Last Action: ", pfLastAction);
    console.log("Profile Functions | Profile To Notify: ", pfToNotify);

    return profiles;
}

export function requestProfilesForSolicitations(solicitation: Solicitation, pfUid: string, isAUpdate: boolean = false): any {
    return getProfilesToBuildNotification(solicitation, pfUid)
        .then((profiles: Array<Profile>) => {
            return notifyUserOnSolicitation(solicitation, profiles, isAUpdate);
        })
        .catch(() => {
            console.log("Error on requesting Profiles!");
            console.log("Skiping...");
            return null;
        });
}

export async function updateProfile(userMaxRate: number, userMinRate: number, userAvaliationsCount: number, userTotalRate: number, pfRated: Profile): Promise<any> {
    console.log("Profile Functions | New Lowest rate!");
    pfRated.userMaxRate = userMaxRate;

    console.log("Profile Functions | New Highest rate!");
    pfRated.userMinRate = userMinRate;

    console.log("Profile Functions | Updating ", pfRated.name.firstName, "avaliations count and user rate!");
    pfRated.avaliationsCount = userAvaliationsCount;
    pfRated.userRate = userTotalRate / userAvaliationsCount;

    console.log("Profile Functions | Updating profile on Database!");
    return await admin.firestore().doc(Constants.PROFILES_COLLECTION + pfRated.uid).update(pfRated)
        .then(() => {
            console.log("Profile Functions | Success on uodate profile!");
            console.log("Skiping...");
            return null;
        })
        .catch((e) => {
            console.log("Profile Functions | Error on update profile!");
            console.log("Profile Functions | Error ", e);
            console.log("Skiping...");
            return null;
        });
}