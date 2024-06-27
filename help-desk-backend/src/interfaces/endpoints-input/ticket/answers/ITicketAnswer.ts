import { Request } from "express";
import z from 'zod';

export const ticketAnswerInputBodySchema = z.object({
    text: z.string().max(512)
});

export const ticketAnswerInputParamsSchema = z.object({
    id: z.string()
});

export type TicketAnswerInputBody = z.infer<typeof ticketAnswerInputBodySchema>;
export type TicketAnswerInputParams = z.infer<typeof ticketAnswerInputParamsSchema>;

export default interface ITicketAnswerInput extends Request {
    body: TicketAnswerInputBody,
    params: {
        id: string
    },
    query: {

    }
}