import { Request } from "express";
import z from 'zod';

export const userDeleteInputParamsSchema = z.object({
    id: z.string(),
});

type UserDeleteInputParams = z.infer<typeof userDeleteInputParamsSchema>;

export default interface IUserDeleteInput extends Request {
    body: {

    },
    params: UserDeleteInputParams,
    query: {

    }
}