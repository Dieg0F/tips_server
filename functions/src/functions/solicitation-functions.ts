import * as functions from 'firebase-functions';
import { Constants, SOLICITATION_PARAMS_UID } from '../utils/constants';

import { solicitationParse } from '../model/solicitation';
import { requestProfilesForSolicitations } from './profile-functions';

export function onSolicitationCreate() {
    return functions.firestore.document(Constants.SOLICITATION_COLLECTION + SOLICITATION_PARAMS_UID)
        .onCreate((snap: any) => {
            console.log("Solicitation Functions | New solicitation was created!");
            const data = snap.data();

            if (data !== undefined) {
                console.log("Solicitation Functions | Requesting Contractor Profile!");
                const solicitation = solicitationParse(data);

                return requestProfilesForSolicitations(solicitation, solicitation.hiredUid);
            } else {
                console.log("Solicitation is undefined!");
                console.log("Skiping...");
                return null;
            }
        });
}



export function onSolicitationUpdate() {
    return functions.firestore.document(Constants.SOLICITATION_COLLECTION + SOLICITATION_PARAMS_UID)
        .onUpdate(async (snap: any) => {
            console.log("Solicitation Functions | Solicitation was updated!");
            const data = snap.after.data();

            if (data) {
                const solicitation = solicitationParse(data);
                var pfUidToNotify: string = "";

                console.log("Solicitation Functions | Getting profile id to notify!");
                if (solicitation.lastActionByUserUid == solicitation.contractorUid) {
                    pfUidToNotify = solicitation.hiredUid;
                } else {
                    pfUidToNotify = solicitation.contractorUid;
                }

                console.log("Solicitation Functions | Requesting Profiles!");
                return requestProfilesForSolicitations(solicitation, pfUidToNotify, true);
            } else {
                console.log("Solicitation Functions | Solicitation was undefined!");
                console.log("Skiping...");
                return null;
            }
        });
}