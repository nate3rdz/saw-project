import { Request } from "express";
import z from 'zod';

export const ticketCloseInputParamsSchema = z.object({
    id: z.string()
});

export type TicketCloseInputParams = z.infer<typeof ticketCloseInputParamsSchema>;

export default interface ITicketCloseInput extends Request {
    body: {

    },
    params: TicketCloseInputParams,
    query: {

    }
}