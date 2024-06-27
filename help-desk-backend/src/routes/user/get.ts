import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import { AppDataSource } from "../../database/data/data-source.js";
import { Accounts } from "../../database/entities/Accounts.js";
import IUsersGetInput, { userGetInputParamsSchema } from "../../interfaces/endpoints-input/user/IUserGet.js";
import { IUserGetOutput } from "../../interfaces/endpoints-output/user/IUserGet.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";


export class UserGet extends Endpoint<IUsersGetInput, Response, IUserGetOutput> {
    constructor() {
        const middlewares: IEndpointMiddleware[] = [];
        super(middlewares);

        this.auth = true;
        this.function = this.fn;
        this.method = "get";
        this.requiredPermissions = ['user-manage'];
        this.path = '/users/:username';
    }

    setValidators() {
        const inputParamsValidator: IEndpointValidator = {
            schema: userGetInputParamsSchema,
            dest: "endpoint-input",
            target: "params"
        };

        this.validators.push(inputParamsValidator);
    }

    async fn(req: IUsersGetInput, res: Response): Promise<IUserGetOutput> {
        console.log(req.params.username);
        const result = await AppDataSource.getRepository(Accounts).findOne({where: {username: req.params.username}});
        if (!result)
            throw new InternalAPIError('Account not found', 404);

        return result;
    }
}