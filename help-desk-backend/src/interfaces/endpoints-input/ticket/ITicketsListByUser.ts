import { Request } from "express";
import { IPaginationQueryParams, paginationQuerySchema } from "../common/IPaginationQueryParams.js";
import { z } from "zod";

export const ticketListByUserInputParamsSchema = z.object({
    id: z.string()
})
export const ticketListByUserInputQuerySchema = paginationQuerySchema;

export type ITicketsLiByUserInputParams = z.infer<typeof ticketListByUserInputParamsSchema>;

export default interface ITicketsListByUserInput extends Request {
    body: {

    },
    params: ITicketsLiByUserInputParams,
    query: IPaginationQueryParams
}