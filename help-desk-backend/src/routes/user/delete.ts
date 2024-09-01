import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import AppDataSource from "../../database/data/data-source.js";
import { Accounts } from "../../database/entities/Accounts.js";
import IUserDeleteInput, {
  userDeleteInputParamsSchema,
} from "../../interfaces/endpoints-input/user/IUserDelete.js";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";

export class UserLogin extends Endpoint<IUserDeleteInput, Response, void> {
  constructor() {
    super([]);

    this.function = this.fn;
    this.requiredPermissions = ["user-manage"];
    this.method = "delete";
    this.path = "/users/:id";
  }

  setValidators() {
    const inputValidator: IEndpointValidator = {
      schema: userDeleteInputParamsSchema,
      dest: "endpoint-input",
      target: "params",
    };

    this.validators.push(inputValidator);
  }

  async fn(req: IUserDeleteInput, res: Response): Promise<void> {
    const result = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Accounts)
      .where("id = :id", { id: req.params.id })
      .execute();

    if (result.affected === 0)
      throw new InternalAPIError("User not found.", 404);
    else return;
  }
}
