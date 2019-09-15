import { GeoLocation } from "./geo-location";

export interface Profile {
    uid: string;
    nome: string;
    email: string;
    isAPro: boolean;
    isActive: boolean;
    telefone: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cpf: string;
    geoLocation: GeoLocation,
    areaAtuacao: string;
    setor?: string;
    aboutMe: string;
    profilePhotoUrl: string;
    hideMyProfile: boolean;
    userGalery: Array<string>;
    userRate: number;
    userMinRate: number;
    userMaxRate: number;
    servicesCount: number;
    avaliationsCount: number;
    deviceToken: string;
}

export function profileParse(data: any): Profile {
    console.log("Profile | Parsing data to Profile.");
    let profile: Profile = {
        uid: data.uid,
        nome: data.nome,
        email: data.email,
        isAPro: data.isAPro,
        isActive: data.isActive,
        telefone: data.telefone,
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cpf: data.cpf,
        areaAtuacao: data.areaAtuacao,
        setor: data.setor,
        aboutMe: data.aboutMe,
        profilePhotoUrl: data.profilePhotoUrl,
        userGalery: data.userGalery,
        geoLocation: data.geoLocation,
        hideMyProfile: data.hideMyProfile,
        userRate: data.userRate,
        userMaxRate: data.userMaxRate,
        userMinRate: data.userMinRate,
        servicesCount: data.servicesCount,
        avaliationsCount: data.avaliationsCount,
        deviceToken: data.deviceToken
    }

    console.log("Profile | Parsing data completed!");
    return profile;
}