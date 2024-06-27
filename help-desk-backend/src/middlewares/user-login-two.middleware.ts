import { EndpointMiddleware } from "../classes/EndpointMiddleware.js";
import IUserLoginInput from "../interfaces/endpoints-input/user/IUserLogin.js";

export default class UserLoginTwoTest extends EndpointMiddleware<IUserLoginInput, IUserLoginInput> {
    constructor () {
        super();
    }

    static function = async (req: IUserLoginInput) => {
        req.body.username = 'nome_pippato_modificato_two';

        return req;
    }
}