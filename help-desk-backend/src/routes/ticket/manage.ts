import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import { AppDataSource } from "../../database/data/data-source.js";
import { Tickets } from "../../database/entities/Ticket.js";
import ITicketManageInput, { ticketManageInputBodySchema, ticketManageInputParamsSchema } from "../../interfaces/endpoints-input/ticket/ITicketManage.js";
import { ITicketManageOutput } from "../../interfaces/endpoints-output/ticket/ITicketManage.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator";


export class TicketManage extends Endpoint<ITicketManageInput, Response, ITicketManageOutput> {
    constructor() {
        const middlewares: IEndpointMiddleware[] = [];
        super(middlewares);

        this.auth = true;
        this.function = this.fn;
        this.method = "patch";
        this.path = '/tickets/:id';
        this.requiredPermissions = ['manage-tickets'];
    }

    setValidators() {
        const inputBodyValidator: IEndpointValidator = {
            schema: ticketManageInputBodySchema,
            dest: "endpoint-input",
            target: "body"
        };

        const paramsValidator: IEndpointValidator = {
            schema: ticketManageInputParamsSchema,
            dest: "endpoint-input",
            target: "params"
        }

        this.validators.push(inputBodyValidator, paramsValidator);
    }

    async fn(req: ITicketManageInput, res: Response): Promise<ITicketManageOutput> {
        const result = await AppDataSource.createQueryBuilder().update(Tickets).set(req.body || {}).where("id = :id", {id: req.params.id}).execute();
        if (result.affected === 0)
            throw new InternalAPIError('Ticket not found.', 404);

        const ticket = await AppDataSource.createQueryBuilder().select().from(Tickets, 'tickets').where("id = :id", {id: req.params.id}).execute();

        const output: ITicketManageOutput = ticket;
        return output;
    }
}