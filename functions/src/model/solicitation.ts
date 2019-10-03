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

export function serviceParse(data: any): Service {
    console.log("Service | Parsing data to Service.");
    let service: Service = {
        uId: data.uId,
        serviceId: data.serviceId,
        ownerUid: data.ownerUid,
        contractorUid: data.contractorUid,
        hiredUid: data.hiredUid,
        lastActionByUserUid: data.lastActionByUserUid,
        avaliationUid: data.avaliationUid,
        name: data.name,
        description: data.description,
        date: data.date,
        status: data.status,
        isRemoved: data.isRemoved
    }

    console.log("Service | Parsing data completed!");
    return service;
}