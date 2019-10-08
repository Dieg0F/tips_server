export class Constants {

    /**
     * Firebase Collections.
     */
    static PROFILES_COLLECTION = "/profiles/";
    static USERS_COLLECTION = "/users/";
    static AVALIATIONS_COLLECTION = "/avaliations/";
    static SERVICES_COLLECTION = "/services/";
    static SOLICITATION_COLLECTION = "/solicitations/";
    static SECTORS_COLLECTION = "/sectors/";
    static AREAS_COLLECTION = "/areas/";

    /**
     * Solicitation status.
     */
    static SOLICITATION_IS_OPEN = "SOLICITATION_IS_OPEN";
    static SOLICITATION_IS_RUNNING = "SOLICITATION_IS_RUNNING";
    static SOLICITATION_IS_FINISHED = "SOLICITATION_IS_FINISHED";
    static SOLICITATION_IS_CANCELED = "SOLICITATION_IS_CANCELED";
    static SOLICITATION_IS_REMOVED = "SOLICITATION_IS_REMOVED";
    static SOLICITATION_IS_AWAIT_TO_FINISH = "SOLICITATION_IS_AWAIT_TO_FINISH";
    static SOLICITATION_IS_AWAIT_TO_CANCEL = "SOLICITATION_IS_AWAIT_TO_CANCEL";
}

export const SOLICITATION_PARAMS_UID = "{uId}";

export const PROFILES = {
    PROFILE_TO_SHOW_ON_NOTIFICATION: 0,
    PROFILE_TO_NOTIFY: 1
}