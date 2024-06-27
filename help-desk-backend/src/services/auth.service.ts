import jwt from 'jsonwebtoken';
import IJWT, { JWTData } from "../interfaces/system/IAuth.js";

import { compareSync } from 'bcrypt';
import { Accounts } from '../database/entities/Accounts.js';
import Environment from "../env.js";

const environment = Environment.getInstance();

export default class AuthService {
    constructor() {
    }

    static async authenticate(user: Accounts, password: string): Promise<{ token: string, success: boolean }> {
        const compare = compareSync(password, user.password);
        if (compare) {
            const jwt = this.generate({ userId: user.id });

            return { token: jwt.token, success: true };
        } else return { token: "Unauthorized.", success: false };
    }

    /**
     * This function generates a JWT with given data
     * @param {JWTData} data
     * @returns {Promise<IJWT>}
     */
    static generate(data: JWTData): IJWT {
        try {
            const token = jwt.sign(data, environment.config.jwt.secret); // signs the jwt
            return { token, data }; // returns the JWT
        } catch (e) {
            console.error(e.toString());
        }
    }

    /**
     * This functions decodes the JWT payload, gives it a type and then returns it plus the token
     * @param token
     */
    static getDataByToken(token: string): IJWT {
        try {
            if (!token) throw new Error('Invalid token provided');

            if (token.match(/^(Bearer) ([a-zA-Z0-9\-_.]+)$/g))
                token = token.split(' ')[1];

            const tok = jwt.decode(token);
            if (typeof (tok) === 'string') return null;

            return {
                token,
                data: { ...tok as JWTData }
            };
        } catch (e) {
            console.error(e.toString());
        }
    }

    /**
     * This functions checks the validity of a given JWT token
     * @param token
     */
    static validate(token: string): boolean {
        if (token.match(/^(Bearer) ([a-zA-Z0-9\-_.]+)$/g))
            token = token.split(' ')[1];

        jwt.verify(token, environment.config.jwt.secret, (err, decoded) => {
            if (err)
                return false;
        });
        return true;
    }

}