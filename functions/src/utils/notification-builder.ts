import { Profile } from '../model/profile';
import { Constants } from './constants';
import { Solicitation } from '../model/solicitation';


export class NotificationBuilder {

    static updateProfile(profile: Profile): any {
        console.log("NotificationBuilder | Creating notification for a Profile Update.")
        const payload = {
            data: {
                title: "update_profile",
                body: profile.uid,
            }
        };

        console.log("NotificationBuilder | Notification payload: ", payload);
        return payload;
    }

    static createSolicitation(solicitationUid: string, contractorName: any): any {
        console.log("NotificationBuilder | Creating notification for a new service.")
        const payload = {
            data: {
                title: "new_solicitation",
                body: solicitationUid,
            },
            notification: {
                title: "Solicitação de serviço",
                body: contractorName.firstName + " " + contractorName.lastName + " te enviou uma solicitação de serviço!"
            }
        };

        console.log("NotificationBuilder | Notification payload: ", payload);
        return payload;
    }

    static updateSolicitation(solicitation: Solicitation, pfLastAction: Profile): any {
        console.log("NotificationBuilder | Creating notification for a solicitation update.");

        var notificationTitle: string = "";
        var notificationBody: string = "";
        var userFullName = pfLastAction.name.firstName + " " + pfLastAction.name.lastName;

        console.log("NotificationBuilder | Solicitation status: ", solicitation.status);
        switch (solicitation.status) {
            case Constants.SOLICITATION_IS_RUNNING:
                notificationTitle = "Serviço aprovado!";
                notificationBody = userFullName + " aprovou a sua solicitação de serviço!";
                break;
            case Constants.SOLICITATION_IS_FINISHED:
                notificationTitle = "Serviço finalizado!";
                notificationBody = userFullName + " finalizou a solicitação de serviço!";
                break;
            case Constants.SOLICITATION_IS_CANCELED:
                notificationTitle = "Serviço cancelado!";
                notificationBody = userFullName + " cancelou a solicitação de serviço!";
                break;
        }

        const payload = {
            data: {
                title: "update_solicitation",
                body: solicitation.uId,
            },
            notification: {
                title: notificationTitle,
                body: notificationBody
            }
        };

        console.log("NotificationBuilder | Notification payload: ", payload);
        return payload;
    }

    static createAvaliation(avaliationUid: string, profile: Profile) {
        console.log("NotificationBuilder | Creating notification for a new avaliation.")

        var userFullName = profile.name.firstName + " " + profile.name.lastName;

        const payload = {
            data: {
                title: "new_avaliaiton",
                body: avaliationUid,
            },
            notification: {
                title: "Avaliação recebida",
                body: "Você recebeu uma avaliação de " + userFullName
            }
        };

        console.log("NotificationBuilder | Notification payload: ", payload);
        return payload;
    }
}