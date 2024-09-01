import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import AppDataSource from "../../database/data/data-source.js";
import { Tickets } from "../../database/entities/Ticket.js";
import ITicketCreateInput, {
  ticketCreateInputBodySchema,
} from "../../interfaces/endpoints-input/ticket/ITicketCreate.js";
import {
  ITicketCreateOutput,
  ticketCreateOutputSchema,
} from "../../interfaces/endpoints-output/ticket/ITicketCreate.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator";

export class TicketCreate extends Endpoint<
  ITicketCreateInput,
  Response,
  ITicketCreateOutput
> {
  constructor() {
    const middlewares: IEndpointMiddleware[] = [];
    super(middlewares);

    this.auth = true;
    this.function = this.fn;
    this.method = "post";
    this.path = "/tickets";
  }

  setValidators() {
    const inputBodyValidator: IEndpointValidator = {
      schema: ticketCreateInputBodySchema,
      dest: "endpoint-input",
      target: "body",
    };

    const outputValidator: IEndpointValidator = {
      schema: ticketCreateOutputSchema,
      dest: "endpoint-output",
      target: "other",
    };

    this.validators.push(inputBodyValidator, outputValidator);
  }

  async fn(
    req: ITicketCreateInput,
    res: Response
  ): Promise<ITicketCreateOutput> {
    const ticket: Tickets = new Tickets();

    ticket.account = this.innerData.account;
    ticket.description = req.body.description;
    ticket.subject = req.body.subject;

    const result = await AppDataSource.getRepository(Tickets).insert(ticket);
    if (result.identifiers === null)
      throw new InternalAPIError("Error while creating a new ticket.", 500);

    const output: ITicketCreateOutput = {
      ID: ticket.id,
    };

    return output;
  }
}
