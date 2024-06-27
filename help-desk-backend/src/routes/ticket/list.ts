import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import { Tickets } from "../../database/entities/Ticket.js";
import ITicketsListInput, { ticketListInputQuerySchema } from "../../interfaces/endpoints-input/ticket/ITicketsList.js";
import { ITicketsListOutput } from "../../interfaces/endpoints-output/ticket/ITicketsList.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";
import PaginationService from "../../services/pagination.service.js";


export class TicketsList extends Endpoint<ITicketsListInput, Response, ITicketsListOutput> {
    constructor() {
        const middlewares: IEndpointMiddleware[] = [];
        super(middlewares);

        this.auth = true;
        this.function = this.fn;
        this.method = "get";
        this.path = '/tickets';
    }

    setValidators() {
        const inputQueryValidator: IEndpointValidator = {
            schema: ticketListInputQuerySchema,
            dest: "endpoint-input",
            target: "query"
        };

        this.validators.push(inputQueryValidator);
    }

    async fn(req: ITicketsListInput, res: Response): Promise<ITicketsListOutput> {
        const paginatedResult = await PaginationService.paginate(
            {where: {account: {id: this.innerData.account.id}}, take: Number(req.query?.limit), skip: Number(req.query?.skip)},
            Tickets,
            {property: 'createdAt', order: 'ASC'},
            ['description']
        );

        const output: ITicketsListOutput = {tickets: paginatedResult.data, count: paginatedResult.count};
        return output;
    }
}