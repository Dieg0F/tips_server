import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Constants } from '../utils/constants';
import { NotificationBuilder } from '../utils/notification-builder';
import { NotificationSender } from '../utils/notification-sender';
import { serviceParse } from '../model/service';
import { profileParse } from '../model/profile';

const serviceUidParams = "{uId}";

export function onServiceCreate() {
    return functions.firestore.document(Constants.SERVICES_COLLECTION + serviceUidParams)
        .onCreate((snap) => {
            console.log("Service Functions | New service created!");
            const data = snap.data();

            if (data !== undefined) {
                console.log("Service Functions | Requesting Contractor Profile!");
                const service = serviceParse(data);

                return admin.firestore().doc(Constants.PROFILES_COLLECTION + service.contractorUid).get()
                    .then(async (profileContractorSnap: any) => {
                        const pfContractor = profileParse(profileContractorSnap.data());

                        console.log("Service Functions | Requesting Hired Profile!");
                        return admin.firestore().doc(Constants.PROFILES_COLLECTION + service.hiredUid).get()
                            .then(async (profileHiredSnap: any) => {
                                const pfHired = profileParse(profileHiredSnap.data());

                                if (service.ownerUid === pfHired.uid) {
                                    const payload = NotificationBuilder.createService(service.uId, pfContractor.nome);

                                    console.log("Service Functions | Prepared to send a notification to Hired User!");
                                    return NotificationSender.sendNotification(pfHired.deviceToken, payload);
                                } else {
                                    console.log("Service Functions | Service document created to Contractor User.");
                                    console.log("Service Functions | Contractor users will not receive notifications!");
                                    console.log("Skiping...");
                                    return null;
                                }
                            });
                    });
            } else {
                console.log("Service is undefined!");
                console.log("Skiping...");
                return null;
            }
        });
}

export function onServiceUpdate() {
    return functions.firestore.document(Constants.SERVICES_COLLECTION + serviceUidParams)
        .onUpdate((snap) => {
            console.log("Service Functions | Service update!");
            const service = serviceParse(snap.after.data());
            let pfUidToNotify: string = "";

            if (service.lastActionByUserUid == service.contractorUid) {
                pfUidToNotify = service.hiredUid;
            } else {
                pfUidToNotify = service.contractorUid;
            }

            if (service.ownerUid !== service.lastActionByUserUid && service.avaliationUid === null) {
                console.log("Service Functions | Requesting user's profile that make the last update on this service!");
                return admin.firestore().doc(Constants.PROFILES_COLLECTION + service.lastActionByUserUid).get()
                    .then(async (pfLastActionSnap: any) => {
                        const pfLastAction = profileParse(pfLastActionSnap.data());

                        console.log("Service Functions | Requesting user's profile that will receive the notification!");
                        return admin.firestore().doc(Constants.PROFILES_COLLECTION + pfUidToNotify).get()
                            .then(async (pfToNotifySnap: any) => {
                                const pfToNotify = profileParse(pfToNotifySnap.data());

                                console.log("Service Functions | Send Notification to User: ", pfToNotify.nome);
                                var payload = NotificationBuilder.updateService(service, pfLastAction);

                                console.log("Service Functions | Prepared to send a notification to User!");
                                return NotificationSender.sendNotification(pfToNotify.deviceToken, payload);
                            });
                    });
            } else {
                console.log("Service Functions | Notification for user that make this update will not send!");
                console.log("Skiping...");
                return null;
            }
        });
}

