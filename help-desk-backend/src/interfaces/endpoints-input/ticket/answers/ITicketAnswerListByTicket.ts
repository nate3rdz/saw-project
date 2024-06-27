import { Request } from "express";
import z from 'zod';
import { paginationQuerySchema } from "../../common/IPaginationQueryParams.js";

export const ticketAnswerListByTicketInputParamsSchema = z.object({
    id: z.string()
});

export const ticketAnswerListByTicketInputQuerySchema = paginationQuerySchema;

export type TicketAnswerListByTicketInputParams = z.infer<typeof ticketAnswerListByTicketInputParamsSchema>;
export type TicketAnswerListByTicketInputQuery = z.infer<typeof ticketAnswerListByTicketInputQuerySchema>;

export default interface ITicketAnswerListByTicket extends Request {
    body: {

    },
    params: TicketAnswerListByTicketInputParams,
    query: {

    }
}