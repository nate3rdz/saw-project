import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import AppDataSource from "../../database/data/data-source.js";
import { Accounts } from "../../database/entities/Accounts.js";
import IUserCreateInput, {
  userCreateInputBodySchema,
} from "../../interfaces/endpoints-input/user/IUserCreate.js";
import { IUserCreateOutput } from "../../interfaces/endpoints-output/user/IUserCreate";

export class UserRegister extends Endpoint<
  IUserCreateInput,
  Response,
  IUserCreateOutput
> {
  constructor() {
    super([]);

    this.function = this.fn;
    this.auth = false;
    this.method = "post";
    this.path = "/users/register";
  }

  setValidators() {
    this.validators.push({
      dest: "endpoint-input",
      target: "body",
      schema: userCreateInputBodySchema,
      customStatusNumber: 400,
    });
  }

  async fn(req: IUserCreateInput): Promise<IUserCreateOutput> {
    const account: Accounts = new Accounts();

    account.username = req.body.username;
    account.password = req.body.password;
    account.email = req.body.email;

    const result = await AppDataSource.getRepository(Accounts).insert(account);
    if (result.identifiers === null)
      throw new InternalAPIError("Error while registering a new user.", 500);

    const output: IUserCreateOutput = {
      ID: account.id,
    };

    return output;
  }
}
