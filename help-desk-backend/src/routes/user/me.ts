import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import IMeInput from "../../interfaces/endpoints-input/user/IMe.js";
import { IMeOutput } from "../../interfaces/endpoints-output/user/IMe.js";


export class Me extends Endpoint<IMeInput, Response, IMeOutput> {
    constructor() {
        super([]);

        this.function = this.fn;
        this.auth = true;
        this.method = "get";
        this.path = '/me';
    }

    setValidators() {
    }

    async fn(req: IMeInput, res: Response): Promise<IMeOutput> {
        return this.innerData.account;
    }
}