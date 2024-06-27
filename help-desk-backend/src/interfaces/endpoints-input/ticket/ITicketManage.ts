import { Request } from "express";
import z from 'zod';

export const ticketManageInputBodySchema = z.object({
    closed: z.boolean()
});

export const ticketManageInputParamsSchema = z.object({
    id: z.string()
});

export type TicketManageInputBody = z.infer<typeof ticketManageInputBodySchema>;
export type TicketManageInputParams = z.infer<typeof ticketManageInputParamsSchema>;

export default interface ITicketManageInput extends Request {
    body: TicketManageInputBody,
    params: {
        id: string
    },
    query: {

    }
}