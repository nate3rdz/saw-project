import { UserPermissions } from "../interfaces/system/IAuth.js";

export default class PermissionsService {
    constructor() {

    }

    /**
     * This function checks an array of given user permissions and an array of required permissions, telling if the given permissions satisfies required permissions
     * @param givenPermissions Array of permissions of the user
     * @param requiredPermissions Array of required permissions
     * @returns {boolean} True if the given permissions satisfies the required permissions, false else.
     */
    static validate(givenPermissions: UserPermissions[], requiredPermissions: UserPermissions[]) {
        for (const searchedPermission of requiredPermissions) {
            if (!givenPermissions.includes(searchedPermission))
                return false;
        }

        return true;
    }
}