import { Request } from "express";
import z from 'zod';

export const userLoginInputBodySchema = z.object({
    username: z.string(),
    password: z.string()
});

export type UserLoginInputBody = z.infer<typeof userLoginInputBodySchema>;

export default interface IUserLoginInput extends Request {
    body: UserLoginInputBody
}