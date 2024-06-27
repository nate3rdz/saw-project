import { UserPermissions, USER_PERMISSIONS } from "../../interfaces/system/IAuth.js";
import PropellerLogger from "../../services/propellerLogger.service.js";
import { AppDataSource } from "../data/data-source.js";
import { Permissions } from "../entities/Permissions.js";

/** Loads, if needed, shared data (such as user permissions) into database tables. */
export async function dataSynchronizer() {

    // Finds all the existing permissions in the database
    const existingPermissions = await AppDataSource.getRepository(Permissions).find();

    const missingPermissions: UserPermissions[] = []; // the permissions not already pushed into the database.

    USER_PERMISSIONS.forEach(async (permission) => { // for each code-defined user permission
        if (!existingPermissions.some((p) => p.name === permission)) { // if the examinated code-defined permission is not on the DB, add it on the list of missing permissions
            missingPermissions.push(permission);
        }
    })

    // creates into the database all the missing permissions, if any
    if (missingPermissions.length < 1)
        return;

    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Permissions)
        .values(missingPermissions.map((permission) => {
            return {
                name: permission
            }
        }))
        .execute();

    PropellerLogger.info('Database shared data synchronized.');
}