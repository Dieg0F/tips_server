export interface Avaliation {
    uId: string;
    evaluatorUid: string;
    ratedUid: string;
    solicitationId: string;
    name: string;
    profileNames: {
        evaluatorName: string;
        ratedName: string;
    }
    body: string;
    rate: number;
    date: number;
}



export function avaliationParse(data: any): Avaliation {
    console.log("Avaliation | Parsing data to Avaliation.");
    const avaliation: Avaliation = {
        uId: data.uId,
        evaluatorUid: data.evaluatorUid,
        ratedUid: data.ratedUid,
        solicitationId: data.solicitationId,
        name: data.name,
        profileNames: {
            evaluatorName: data.profileNames.evaluatorName,
            ratedName: data.profileNames.ratedName
        },
        body: data.body,
        rate: data.rate,
        date: data.date
    }

    console.log("Avaliation | Parsing data completed!");
    return avaliation;
}