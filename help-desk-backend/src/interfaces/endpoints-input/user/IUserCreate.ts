import { Request } from "express";
import z from 'zod';

export const userCreateInputBodySchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
});

export type UserCreateInputBody = z.infer<typeof userCreateInputBodySchema>;

export default interface IUserCreateInput extends Request {
    body: UserCreateInputBody,
    params: {

    },
    query: {

    }
}