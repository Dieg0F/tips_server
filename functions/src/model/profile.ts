export interface Profile {
    uid: string;
    name: {
        firstName: string;
        lastName: string;
    }
    email: string;
    isAPro: boolean;
    isActive: boolean;
    phone: string;
    street: string;
    houseNumber: string;
    district: string;
    city: string;
    state: string;
    cpf: string;
    geoLocation: {
        lat: number;
        lng: number;
    },
    job: string;
    aboutMe: string;
    profilePhotoUrl: string;
    hideMyProfile: boolean;
    userRate: number;
    userRateStars: number;
    userMinRate: number;
    userMaxRate: number;
    solicitationCount: number;
    avaliationsCount: number;
    deviceToken: string;
    social: {
        facebook: string;
        showFacebook: boolean;
        instagram: string;
        showInstagram: boolean;
        whatsapp: string;
        showWhatsApp: boolean;
        directCall: boolean;
    };
}

export function profileParse(data: any): Profile {
    console.log("Profile | Parsing data to Profile.");
    const profile: Profile = {
        uid: data.uid,
        name: data.name,
        email: data.email,
        isAPro: data.isAPro,
        isActive: data.isActive,
        phone: data.phone,
        street: data.street,
        houseNumber: data.houseNumber,
        district: data.district,
        city: data.city,
        state: data.state,
        cpf: data.cpf,
        job: data.job,
        aboutMe: data.aboutMe,
        profilePhotoUrl: data.profilePhotoUrl,
        geoLocation: data.geoLocation,
        hideMyProfile: data.hideMyProfile,
        userRate: data.userRate,
        userRateStars: data.userRateStars,
        userMaxRate: data.userMaxRate,
        userMinRate: data.userMinRate,
        solicitationCount: data.solicitationCount,
        avaliationsCount: data.avaliationsCount,
        deviceToken: data.deviceToken,
        social: data.social
    }

    console.log("Profile | Parsing data completed!");
    return profile;
}