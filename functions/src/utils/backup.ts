// exports.sendNotification = functions.firestore.document('/services/{uId}')
//     .onCreate((snap) => {

//         const service = snap.data();
//         console.log("Service: ", service);

//         if (service != undefined) {
//             //get the user id of the person who sent the message
//             const contractorUid = service.contractorUid;
//             console.log("contractorUid: ", contractorUid);

//             //get the userId of the person receiving the notification because we need to get their token
//             const hiredUid = service.hiredUid;
//             console.log("hiredUid: ", hiredUid);

//             //get the message
//             const nameService = service.name;
//             console.log("nameService: ", nameService);

//             //get the message id. We'll be sending this in the payload
//             const serviceUid = service.uId;
//             console.log("serviceUid: ", serviceUid);

//             //query the users node and get the name of the user who sent the message
//             return admin.firestore().doc("/profiles/" + contractorUid).get()
//                 .then(async (profileContractorSnap: any) => {

//                     const profileContractor = profileContractorSnap.data();
//                     console.log("User Contractor: ", profileContractor);

//                     //get the token of the user receiving the message
//                     return admin.firestore().doc("/profiles/" + hiredUid).get()
//                         .then(async (profileHiredSnap: any) => {

//                             const profileHired = profileHiredSnap.data();
//                             console.log("User Hired: ", profileHired);

//                             if (service.ownerUid == profileHired.uid) {

//                                 const token = "ffcrfgerIOY:APA91bETRZfvDXd1lO4zD4bGDyjfoiIzVaAS9AUR8kMpkETzBWg-oIG2QQpvBSUgdRGZF0uhMeOQ10rRCsZXK5ihnbmj8wUsFqUCSzroeGCdIswmq36nC3A03gZKc0PSSVnugWrqbEca"
//                                 console.log("token: ", token);

//                                 //we have everything we need
//                                 //Build the message payload and send the message
//                                 console.log("Construction the notification message.");
//                                 const payload = {
//                                     data: {
//                                         title: "service",
//                                         body: service.uId,
//                                     },
//                                     notification: {
//                                         title: "Solicitação de serviço",
//                                         body: profileContractor.nome + " te enviou uma solicitação de serviço!"
//                                     }
//                                 };
//                                 console.log("Message Payload: ", payload);

//                                 return admin.messaging().sendToDevice(token, payload)
//                                     .then((response: any) => {
//                                         console.log("Successfully sent message:", response);
//                                     })
//                                     .catch((error: any) => {
//                                         console.log("Error sending message:", error);
//                                     });
//                             } else {
//                                 console.log("Service Owner: ", service.ownerUid);
//                                 console.log("Service Hired: ", service.hiredUid);
//                                 console.log("Profile Hired: ", profileHired.uid);
//                                 console.log("Skiping...")
//                             }
//                         });
//                 });
//         } else {
//             return snap;
//         }
//     });


// switch (service.status) {
//     case Constants.SERVICE_IS_RUNNING:
//         console.log("Service Functions | Send Accept Service Notification to User: ", pfToNotify.nome);
//         var payload = NotificationBuilder.updateService(service, pfLastAction, pfToNotify);

//         console.log("Service Functions | Prepared to send a notification to User!");
//         return NotificationSender.sendNotification(pfToNotify.deviceToken, payload);
//     case Constants.SERVICE_IS_FINISHED:
//         console.log("Service Functions | Send Service Finish Notification to User: ", pfToNotify.nome);
//         var payload = NotificationBuilder.updateService(service, pfLastAction, pfToNotify);

//         console.log("Service Functions | Prepared to send a notification to User!");
//         return NotificationSender.sendNotification(pfToNotify.deviceToken, payload);
//     case Constants.SERVICE_IS_AWAIT_TO_FINISH:
//         console.log("Service Functions | Send Await Finish Notification to User: ", pfToNotify.nome);
//         var payload = NotificationBuilder.updateService(service, pfLastAction, pfToNotify);

//         console.log("Service Functions | Prepared to send a notification to User!");
//         return NotificationSender.sendNotification(pfToNotify.deviceToken, payload);
//     case Constants.SERVICE_IS_AWAIT_TO_CANCEL:
//         console.log("Service Functions | Send Await Cancel Notification to User: ", pfToNotify.nome);
//         var payload = NotificationBuilder.updateService(service, pfLastAction, pfToNotify);

//         console.log("Service Functions | Prepared to send a notification to User!");
//         return NotificationSender.sendNotification(pfToNotify.deviceToken, payload);
// }