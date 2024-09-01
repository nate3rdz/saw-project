import {
  UserPermissions,
  USER_PERMISSIONS,
} from "../../interfaces/system/IAuth.js";
import PropellerLogger from "../../services/propellerLogger.service.js";
import AppDataSource from "../data/data-source.js";
import { Accounts } from "../entities/Accounts.js";
import { Permissions } from "../entities/Permissions.js";

/** Loads, if needed, shared data (such as user permissions) into database tables. */
export async function dataSynchronizer() {
  // Finds all the existing permissions in the database
  const existingPermissions = await AppDataSource.getRepository(
    Permissions
  ).find();

  const missingPermissions: UserPermissions[] = []; // the permissions not already pushed into the database.

  USER_PERMISSIONS.forEach(async (permission) => {
    // for each code-defined user permission
    if (!existingPermissions.some((p) => p.name === permission)) {
      // if the examinated code-defined permission is not on the DB, add it on the list of missing permissions
      missingPermissions.push(permission);
    }
  });

  // creates into the database all the missing permissions, if any
  if (missingPermissions.length < 1) return;

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Permissions)
    .values(
      missingPermissions.map((permission) => {
        return {
          name: permission,
        };
      })
    )
    .execute();

  // finds permissions
  const toInsertPermissions = await AppDataSource.getRepository(
    Permissions
  ).find();

  // creates test users
  const testUser: Accounts = new Accounts();
  testUser.username = "test_user";
  testUser.password = "123";
  testUser.email = "test_user@test.it";
  await AppDataSource.getRepository(Accounts).insert(testUser);

  const testAdmin: Accounts = new Accounts();
  testAdmin.username = "test_admin";
  testAdmin.password = "123";
  testAdmin.email = "test_admin@test.it";
  await AppDataSource.getRepository(Accounts).insert(testAdmin);

  const permissions = [];
  for (const p of USER_PERMISSIONS) {
    const permissionObject: Permissions[] = await AppDataSource.manager.find(
      Permissions,
      { where: { name: p } }
    );
    permissions.push(...permissionObject);
  }

  testAdmin.permissions = [...permissions];
  await AppDataSource.manager.save(testAdmin);

  PropellerLogger.info("Database shared data synchronized.");
}
