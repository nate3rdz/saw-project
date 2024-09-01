import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import AppDataSource from "../../database/data/data-source.js";
import { Accounts } from "../../database/entities/Accounts.js";
import { Permissions } from "../../database/entities/Permissions.js";
import IUserPermissionsUpdateInput, {
  userPermissionsUpdateInputParamsSchema,
} from "../../interfaces/endpoints-input/user/IUserPermissionsUpdate.js";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";
import InternalAPIError from "../../classes/InternalAPIError.js";

export class UserLogin extends Endpoint<
  IUserPermissionsUpdateInput,
  Response,
  void
> {
  constructor() {
    super([]);

    this.function = this.fn;
    this.requiredPermissions = ["manage-permissions"];
    this.method = "patch";
    this.path = "/users/:id/permissions";
  }

  setValidators() {
    const inputValidator: IEndpointValidator = {
      schema: userPermissionsUpdateInputParamsSchema,
      dest: "endpoint-input",
      target: "params",
    };

    this.validators.push(inputValidator);
  }

  async fn(req: IUserPermissionsUpdateInput, res: Response): Promise<void> {
    const account = await AppDataSource.manager.findOne(Accounts, {
      where: { id: Number(req.params.id) },
    });
    if (!account) throw new InternalAPIError("Account not found", 404);

    const permissions: Permissions[] = [];
    for (const p of req.body.permissions) {
      const permissionObject: Permissions[] = await AppDataSource.manager.find(
        Permissions,
        { where: { name: p } }
      );
      permissions.push(...permissionObject);
    }

    account.permissions = [...permissions];
    await AppDataSource.manager.save(account);

    const account2 = await AppDataSource.manager.find(Accounts, {
      where: { id: Number(req.params.id) },
      relations: { permissions: true },
    });
  }
}
