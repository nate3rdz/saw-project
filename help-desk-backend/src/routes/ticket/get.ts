import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import AppDataSource from "../../database/data/data-source.js";
import { Tickets } from "../../database/entities/Ticket.js";
import ITicketsGetInput, {
  ticketGetInputParamsSchema,
} from "../../interfaces/endpoints-input/ticket/ITicketGet.js";
import { ITicketsGetOutput } from "../../interfaces/endpoints-output/ticket/ITicketGet.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator.js";

export class TicketGet extends Endpoint<
  ITicketsGetInput,
  Response,
  ITicketsGetOutput
> {
  constructor() {
    const middlewares: IEndpointMiddleware[] = [];
    super(middlewares);

    this.auth = true;
    this.function = this.fn;
    this.method = "get";
    this.path = "/tickets/:id";
  }

  setValidators() {
    const inputParamsValidator: IEndpointValidator = {
      schema: ticketGetInputParamsSchema,
      dest: "endpoint-input",
      target: "params",
    };

    this.validators.push(inputParamsValidator);
  }

  async fn(req: ITicketsGetInput, res: Response): Promise<ITicketsGetOutput> {
    const result = await AppDataSource.getRepository(Tickets).findOne({
      where: { id: Number(req.params.id) },
    });
    if (!result) throw new InternalAPIError("Ticket not found", 404);

    return result;
  }
}
