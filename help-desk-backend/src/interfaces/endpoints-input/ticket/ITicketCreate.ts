import { Request } from "express";
import z from 'zod';

export const ticketCreateInputBodySchema = z.object({
    subject: z.string().max(128),
    description: z.string().max(512)
});

export type TicketCreateInputBody = z.infer<typeof ticketCreateInputBodySchema>;

export default interface ITicketCreateInput extends Request {
    body: TicketCreateInputBody,
    params: {

    },
    query: {

    }
}