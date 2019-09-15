import { Profile } from '../model/profile';
import { Service } from '../model/service';
import { Constants } from './constants';


export class NotificationBuilder {

    static createService(serviceUid: string, contractorName: string): any {
        console.log("NotificationBuilder | Creating notification for a new service.")
        const payload = {
            data: {
                title: "new_service",
                body: serviceUid,
            },
            notification: {
                title: "Solicitação de serviço",
                body: contractorName + " te enviou uma solicitação de serviço!"
            }
        };

        console.log("NotificationBuilder | Notification payload: ", payload);
        return payload;
    }

    static updateService(service: Service, pfLastAction: Profile, pfToNotify: Profile): any {
        console.log("NotificationBuilder | Creating notification for a service update.");

        var notificationTitle: string = "";
        var notificationBody: string = "";

        switch (service.status) {
            case Constants.SERVICE_IS_RUNNING:
                notificationTitle = "Serviço aprovado!";
                notificationBody = pfLastAction.nome + " aprovou a sua solicitação de serviço!";
                break;
            case Constants.SERVICE_IS_FINISHED:
                notificationTitle = "Serviço finalizado!";
                notificationBody = pfLastAction.nome + " aceitou o termino do serviço!";
                break;
            case Constants.SERVICE_IS_CANCELED:
                notificationTitle = "Serviço cancelado!";
                notificationBody = pfLastAction.nome + " aceitou o cancelamento do serviço!";
                break;
            case Constants.SERVICE_IS_AWAIT_TO_FINISH:
                notificationTitle = "Finalização de serviço";
                notificationBody = pfLastAction.nome + " finalizou o serviço! Acesse o serviço e finalize!";
                break;
            case Constants.SERVICE_IS_AWAIT_TO_CANCEL:
                notificationTitle = "Cancelamento de serviço";
                notificationBody = pfLastAction.nome + " cancelou o serviço! Acesse para saber mais!";
                break;
        }

        const payload = {
            data: {
                title: "service_update",
                body: service.uId,
            },
            notification: {
                title: notificationTitle,
                body: notificationBody
            }
        };

        console.log("NotificationBuilder | Notification payload: ", payload);
        return payload;
    }
}