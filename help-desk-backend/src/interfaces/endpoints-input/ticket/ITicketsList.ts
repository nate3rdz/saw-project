import { Request } from "express";
import { IPaginationQueryParams, paginationQuerySchema } from "../common/IPaginationQueryParams.js";

export const ticketListInputQuerySchema = paginationQuerySchema;

export default interface ITicketsListInput extends Request {
    body: {

    },
    params: {

    },
    query: IPaginationQueryParams
}