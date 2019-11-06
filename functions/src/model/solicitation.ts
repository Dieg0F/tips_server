export interface Solicitation {
    uId: string;
    solicitationId: string;
    contractorUid: string;
    hiredUid: string;
    lastActionByUserUid: string;
    name: string;
    description: string;
    observations: Array<string>;
    date: number;
    status: string;
    profileNames: {
        contractorName: string;
        hiredName: string;
    }
    removedTo: {
        contractorUid: string;
        hiredUid: string;
    }
    avaliatedTo: {
        contractorAvaliation: string;
        hiredAvaliation: string;
    }
}

export function solicitationParse(data: any): Solicitation {
    console.log("Solicitation | Parsing data to Solicitation.");
    const solicitation: Solicitation = {
        uId: data.uId,
        solicitationId: data.solicitationId,
        contractorUid: data.contractorUid,
        hiredUid: data.hiredUid,
        lastActionByUserUid: data.lastActionByUserUid,
        description: data.description,
        observations: data.observations,
        date: data.date,
        status: data.status,
        name: data.name,
        profileNames: {
            contractorName: data.profileNames.contractorName,
            hiredName: data.profileNames.hiredName,
        },
        removedTo: {
            contractorUid: data.removedTo.contractorUid,
            hiredUid: data.removedTo.hiredName,
        },
        avaliatedTo: {
            contractorAvaliation: data.avaliatedTo.contractorAvaliation,
            hiredAvaliation: data.avaliatedTo.hiredAvaliation,
        }
    }

    console.log("Service | Parsing data completed!");
    return solicitation;
}