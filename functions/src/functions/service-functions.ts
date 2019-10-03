import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Constants } from '../utils/constants';
import { NotificationBuilder } from '../utils/notification-builder';
import { NotificationSender } from '../utils/notification-sender';
import { serviceParse } from '../model/service';
import { profileParse } from '../model/profile';
import { notifyUser } from './profile-functions';

const serviceUidParams = "{uId}";

export function onServiceCreate() {
    return functions.firestore.document(Constants.SERVICES_COLLECTION + serviceUidParams)
        .onCreate((snap) => {
            console.log("Service Functions | New service created!");
            const data = snap.data();

            if (data !== undefined) {
                console.log("Service Functions | Requesting Contractor Profile!");
                const service = serviceParse(data);

                return notifyUser(service, service.hiredUid);
            } else {
                console.log("Service is undefined!");
                console.log("Skiping...");
                return null;
            }
        });
}

export function onServiceUpdate() {
    return functions.firestore.document(Constants.SERVICES_COLLECTION + serviceUidParams)
        .onUpdate(async (snap) => {
            console.log("Service Functions | Service update!");
            const service = serviceParse(snap.after.data());
            let pfUidToNotify: string = "";

            if (service.lastActionByUserUid == service.contractorUid) {
                pfUidToNotify = service.hiredUid;
            } else {
                pfUidToNotify = service.contractorUid;
            }

            if (service.ownerUid !== service.lastActionByUserUid && service.avaliationUid === null) {
                return notifyUser(service, pfUidToNotify)
            } else {
                console.log("Service Functions | Notification for user that make this update will not send!");
                console.log("Skiping...");
                return null;
            }
        });
}

