import { Request } from "express";
import { z } from "zod";


export const userGetInputParamsSchema = z.object({
    username: z.string()
});

export type UserGetInputParams = z.infer<typeof userGetInputParamsSchema>;

export default interface IUsersGetInput extends Request {
    body: {

    },
    params: UserGetInputParams,
    query: {

    }
}