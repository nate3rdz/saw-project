import { Request } from "express";
import { z } from "zod";


export const ticketGetInputParamsSchema = z.object({
    id: z.string()
});

export type TicketGetInputParams = z.infer<typeof ticketGetInputParamsSchema>;

export default interface ITicketsGetInput extends Request {
    body: {

    },
    params: TicketGetInputParams,
    query: {

    }
}