import admin = require("firebase-admin");

import { Constants } from "../utils/constants";
import { profileParse } from "../model/profile";
import { Service } from "../model/service";

export async function notifyUser(service: Service, pfUidToNotify: string) {
    console.log("Profile Functions | Requesting user's profile that make the last update on this service!");
    const pfLastActionSnap = await admin.firestore().doc(Constants.PROFILES_COLLECTION + service.lastActionByUserUid).get();
    const pfLastAction = profileParse(pfLastActionSnap.data());

    console.log("Profile Functions | Requesting user's profile that will receive the notification!");
    const pfToNotifySnap = await admin.firestore().doc(Constants.PROFILES_COLLECTION + pfUidToNotify).get();
    const pfToNotify = profileParse(pfToNotifySnap.data());

    return [pfLastAction, pfToNotify]
}