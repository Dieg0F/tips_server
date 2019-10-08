import { Solicitation } from "../model/solicitation";
import { Profile } from "../model/profile";
import { NotificationBuilder } from "../utils/notification-builder";
import { NotificationSender } from "../utils/notification-sender";
import { PROFILES } from "../utils/constants";


export function notifyUser(solicitation: Solicitation, profiles: Profile[], isAUpdate: boolean = false) {
    var payload: any;

    if (!isAUpdate) {
        console.log("Solicitation Functions | Building Notification content!");
        payload = NotificationBuilder.createSolicitation(solicitation.solicitationId, profiles[PROFILES.PROFILE_TO_SHOW_ON_NOTIFICATION].name);
    } else {
        console.log("Solicitation Functions | Building Notification content!");
        payload = NotificationBuilder.updateSolicitation(solicitation, profiles[PROFILES.PROFILE_TO_SHOW_ON_NOTIFICATION]);
    }

    console.log("Solicitation Functions | Prepared to send a notification to User!");
    return NotificationSender.sendNotification(profiles[PROFILES.PROFILE_TO_NOTIFY].deviceToken, payload);
}
