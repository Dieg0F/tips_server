export interface Service {
    uId: string;
    serviceId: string;
    ownerUid: string;
    contractorUid: string;
    hiredUid: string;
    lastActionByUserUid: string;
    avaliationUid: string;
    name: string;
    description: string;
    date: string;
    status: string;
    isRemoved: boolean;
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