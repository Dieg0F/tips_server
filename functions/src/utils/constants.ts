export class Constants {

    /**
     * Firebase Collections.
     */
    static PROFILES_COLLECTION = "/profiles/";
    static USERS_COLLECTION = "/users/";
    static AVALIATIONS_COLLECTION = "/avaliations/";
    static SERVICES_COLLECTION = "/services/";
    static SECTORS_COLLECTION = "/sectors/";
    static AREAS_COLLECTION = "/areas/";

    /**
    * Services Status.
    */
    static SERVICE_IS_OPEN = "SERVICE_IS_OPEN";
    static SERVICE_IS_RUNNING = "SERVICE_IS_RUNNING";
    static SERVICE_IS_FINISHED = "SERVICE_IS_FINISHED";
    static SERVICE_IS_CANCELED = "SERVICE_IS_CANCELED";
    static SERVICE_IS_REMOVED = "SERVICE_IS_REMOVED";
    static SERVICE_IS_AWAIT_TO_FINISH = "SERVICE_IS_AWAIT_TO_FINISH";
    static SERVICE_IS_AWAIT_TO_CANCEL = "SERVICE_IS_AWAIT_TO_CANCEL";
}