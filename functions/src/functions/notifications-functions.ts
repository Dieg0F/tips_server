import { Solicitation } from "../model/solicitation";
import { Profile } from "../model/profile";
import { NotificationBuilder } from "../utils/notification-builder";
import { NotificationSender } from "../utils/notification-sender";
import { PROFILES } from "../utils/constants";


export function notifyUserOnSolicitation(solicitation: Solicitation, profiles: Profile[], isAUpdate: boolean = false) {
    let payload: any;

    if (!isAUpdate) {
        console.log("Notification Functions | Building Notification content for a new Solicitation!");
        payload = NotificationBuilder.createSolicitation(solicitation.solicitationId, profiles[PROFILES.PROFILE_TO_SHOW_ON_NOTIFICATION].name);
    } else {
        console.log("Notification Functions | Building Notification content a Solicitation Updated!");
        payload = NotificationBuilder.updateSolicitation(solicitation, profiles[PROFILES.PROFILE_TO_SHOW_ON_NOTIFICATION]);
    }

    console.log("Notification Functions | Prepared to send a notification to User!");
    return NotificationSender.sendNotification(profiles[PROFILES.PROFILE_TO_NOTIFY].deviceToken, payload);
}

export function notifyUserOnProfileUpdated(profile: Profile) {

    console.log("Notification Functions | Building Notification content for a profile update!");
    const payload = NotificationBuilder.updateProfile(profile);

    console.log("Notification Functions | Prepared to send a notification to User!");
    return NotificationSender.sendNotification(profile.deviceToken, payload);
}

