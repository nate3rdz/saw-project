import { Request } from "express";
import z from 'zod';

export const userPatchInputBodySchema = z.object({
    Password: z.string().optional(),
    Email: z.string().email().optional()
});

export type UserPatchInputBody = z.infer<typeof userPatchInputBodySchema>;

export default interface IUserPatchInput extends Request {
    body: UserPatchInputBody,
    params: {

    },
    query: {

    }
}