import { Profile } from '../model/profile';
import { Constants } from './constants';
import { Solicitation } from '../model/solicitation';


export class NotificationBuilder {

    static createSolicitation(solicitationUid: string, contractorName: any): any {
        console.log("NotificationBuilder | Creating notification for a new service.")
        const payload = {
            data: {
                title: "new_service",
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
        console.log("NotificationBuilder | Creating notification for a service update.");

        var notificationTitle: string = "";
        var notificationBody: string = "";
        var userFullName = pfLastAction.name.firstName + " " + pfLastAction.name.lastName;

        switch (solicitation.status) {
            case Constants.SOLICITATION_IS_OPEN:
                notificationTitle = "Serviço aprovado!";
                notificationBody = userFullName + " aprovou a sua solicitação de serviço!";
                break;
            case Constants.SOLICITATION_IS_FINISHED:
                notificationTitle = "Serviço finalizado!";
                notificationBody = userFullName + " finalizou do serviço!";
                break;
            case Constants.SOLICITATION_IS_CANCELED:
                notificationTitle = "Serviço cancelado!";
                notificationBody = userFullName + " cancelou a solicitação de serviço!";
                break;
        }

        const payload = {
            data: {
                title: "service_update",
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

    static createAvaliation(avaliationUid: string, pfName: any) {
        console.log("NotificationBuilder | Creating notification for a new avaliation.")

        var userFullName = pfName.name.firstName + " " + pfName.name.lastName;

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