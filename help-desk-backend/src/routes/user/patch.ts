import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import AppDataSource from "../../database/data/data-source.js";
import { Accounts } from "../../database/entities/Accounts.js";
import IUserPatchInput, {
  userPatchInputBodySchema,
} from "../../interfaces/endpoints-input/user/IUserPatch.js";
import {
  IUserPatchOutput,
  userPatchOutputSchema,
} from "../../interfaces/endpoints-output/user/IUserPatch.js";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator";

export class UserPatch extends Endpoint<
  IUserPatchInput,
  Response,
  IUserPatchOutput
> {
  constructor() {
    super([]);

    this.function = this.fn;
    this.method = "patch";
    this.path = "/users";
  }

  setValidators() {
    const bodyInputValidator: IEndpointValidator = {
      schema: userPatchInputBodySchema,
      dest: "endpoint-input",
      target: "body",
    };

    const outputValidator: IEndpointValidator = {
      schema: userPatchOutputSchema,
      dest: "endpoint-output",
      target: "other",
    };

    this.validators.push(bodyInputValidator, outputValidator);
  }

  async fn(req: IUserPatchInput): Promise<IUserPatchOutput> {
    if (Object.keys(req.body).length === 0)
      // in case of missing data in the call
      return {};

    const account = await AppDataSource.createQueryBuilder()
      .update(Accounts)
      .set(req.body || {})
      .where("id = :id", { id: this.innerData.account.id })
      .execute();

    if (account.affected === 0)
      throw new InternalAPIError("Error during user's update.", 304);

    const output: IUserPatchOutput = {
      success: account.affected > 0 ? true : false,
    };

    return output;
  }
}
