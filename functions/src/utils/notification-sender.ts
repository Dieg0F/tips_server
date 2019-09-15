import * as admin from 'firebase-admin';

export class NotificationSender {

    static async sendNotification(deviceToken: string, payload: any): Promise<any> {
        console.log("NotificationSender | Sending notification to device.");
        return admin.messaging().sendToDevice(deviceToken, payload)
            .then((response: any) => {
                console.log("NotificationSender | Notification has been sent!");
                console.log("NotificationSender | Response:", response);
            })
            .catch((error: any) => {
                console.log("NotificationSender | Notification has not been sent!");
                console.log("NotificationSender | Error:", error);
            });
    }

}