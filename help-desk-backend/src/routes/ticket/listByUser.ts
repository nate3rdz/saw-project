import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import { Tickets } from "../../database/entities/Ticket.js";
import { ticketListInputQuerySchema } from "../../interfaces/endpoints-input/ticket/ITicketsList.js";
import ITicketsListByUserInput, { ticketListByUserInputParamsSchema, ticketListByUserInputQuerySchema } from "../../interfaces/endpoints-input/ticket/ITicketsListByUser.js";
import { ITicketsListOutput } from "../../interfaces/endpoints-output/ticket/ITicketsList.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";
import PaginationService from "../../services/pagination.service.js";


export class TicketsListByUser extends Endpoint<ITicketsListByUserInput, Response, ITicketsListOutput> {
    constructor() {
        const middlewares: IEndpointMiddleware[] = [];
        super(middlewares);

        this.auth = true;
        this.function = this.fn;
        this.method = "get";
        this.requiredPermissions = ['manage-tickets'];
        this.path = '/users/:id/tickets';
    }

    setValidators() {
        const inputParamsValidator: IEndpointValidator = {
            schema: ticketListByUserInputParamsSchema,
            dest: "endpoint-input",
            target: "params"
        };

        const inputQueryValidator: IEndpointValidator = {
            schema: ticketListByUserInputQuerySchema,
            dest: "endpoint-input",
            target: "query"
        };

        this.validators.push(inputParamsValidator, inputQueryValidator);
    }

    async fn(req: ITicketsListByUserInput, res: Response): Promise<ITicketsListOutput> {
        const paginatedResult = await PaginationService.paginate(
            {where: {account: {id: Number(req.params.id)}}, take: Number(req.query?.limit), skip: Number(req.query?.skip)},
            Tickets,
            {property: 'createdAt', order: 'ASC'},
            ['description']
        );

        const output: ITicketsListOutput = {tickets: paginatedResult.data, count: paginatedResult.count};
        return output;
    }
}