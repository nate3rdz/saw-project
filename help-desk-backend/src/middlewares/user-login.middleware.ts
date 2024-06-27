import { EndpointMiddleware } from "../classes/EndpointMiddleware.js";
import IUserLoginInput from "../interfaces/endpoints-input/user/IUserLogin.js";

export default class UserLoginTest extends EndpointMiddleware<IUserLoginInput, IUserLoginInput> {
    constructor () {
        super();
    }

    static function = async (req: IUserLoginInput) => {
        req.body.username = 'nome_pippato_modificato';

        return req;
    }
}