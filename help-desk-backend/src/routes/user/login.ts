import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import { AppDataSource } from "../../database/data/data-source.js";
import { Accounts } from "../../database/entities/Accounts.js";
import IUserLoginInput, { userLoginInputBodySchema } from "../../interfaces/endpoints-input/user/IUserLogin.js";
import { IUserLoginOutput, userLoginOutputSchema } from "../../interfaces/endpoints-output/user/IUserLogin.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware.js";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";
import AuthService from "../../services/auth.service.js";


export class UserLogin extends Endpoint<IUserLoginInput, Response, IUserLoginOutput> {
    constructor() {
        const middlewares: IEndpointMiddleware[] = [];
        super(middlewares);

        this.auth = false;
        this.function = this.fn;
        this.method = "post";
        this.path = '/users/login';
    }

    setValidators() {
        const inputBodyValidator: IEndpointValidator = {
            schema: userLoginInputBodySchema,
            dest: "endpoint-input",
            target: "body"
        };

        const outputValidator: IEndpointValidator = {
            schema: userLoginOutputSchema,
            dest: "endpoint-output",
            target: "other"
        }

        this.validators.push(inputBodyValidator, outputValidator);
    }

    async fn(req: IUserLoginInput, res: Response): Promise<IUserLoginOutput> {
        // gets user data
        const account = await AppDataSource.getRepository(Accounts).findOne({ where: { username: req.body.username }, relations: { permissions: true }, select: ['email', 'password', 'permissions', 'registerDate', 'username', 'id'] });
        if (!account)
            throw new InternalAPIError('Account not found.', 404);

        // validates password and generates JWT (or error)
        const authData = await AuthService.authenticate(account, req.body.password);
        if (!authData.success)
            throw new InternalAPIError('Unauthorized', 401);

        const output: IUserLoginOutput = {
            token: authData.token
        };

        return output;
    }
}