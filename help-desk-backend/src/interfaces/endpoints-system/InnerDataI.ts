import { Accounts } from "../../database/entities/Accounts";
import IJWT from "../system/IAuth";

export default interface InnerDataI {
    account: Accounts;
    auth: IJWT;
    request: {
        ip: string;
    }
}