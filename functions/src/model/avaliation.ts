export interface Avaliation {
    uId: string;
    evaluatorUid: string;
    ratedUid: string;
    serviceUid: string;
    body: string;
    rate: number;
    date: string;
}


export function avaliationParse(data: any): Avaliation {
    console.log("Avaliation | Parsing data to Avaliation.");
    let avaliation: Avaliation = {
        uId: data.uId,
        evaluatorUid: data.evaluatorUid,
        ratedUid: data.ratedUid,
        serviceUid: data.serviceUid,
        body: data.body,
        rate: data.rate,
        date: data.date
    }

    console.log("Avaliation | Parsing data completed!");
    return avaliation;
}