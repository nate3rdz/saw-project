import { Response } from "express";
import Endpoint from "../../classes/Endpoint.js";
import InternalAPIError from "../../classes/InternalAPIError.js";
import AppDataSource from "../../database/data/data-source.js";
import { Tickets } from "../../database/entities/Ticket.js";
import ITicketCloseInput, {
  ticketCloseInputParamsSchema,
} from "../../interfaces/endpoints-input/ticket/ITicketClose.js";
import ITicketManageInput from "../../interfaces/endpoints-input/ticket/ITicketManage.js";
import { ITicketManageOutput } from "../../interfaces/endpoints-output/ticket/ITicketManage.js";
import IEndpointMiddleware from "../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../interfaces/endpoints-system/IEndpointValidator";

export class TicketClose extends Endpoint<
  ITicketCloseInput,
  Response,
  ITicketManageOutput
> {
  constructor() {
    const middlewares: IEndpointMiddleware[] = [];
    super(middlewares);

    this.auth = true;
    this.function = this.fn;
    this.method = "delete";
    this.path = "/tickets/:id";
  }

  setValidators() {
    const paramsValidator: IEndpointValidator = {
      schema: ticketCloseInputParamsSchema,
      dest: "endpoint-input",
      target: "params",
    };

    this.validators.push(paramsValidator);
  }

  async fn(
    req: ITicketManageInput,
    res: Response
  ): Promise<ITicketManageOutput> {
    const result = await AppDataSource.createQueryBuilder()
      .update(Tickets)
      .set({ closed: true })
      .where("id = :id", { id: req.params.id })
      .execute();
    if (result.affected === 0)
      throw new InternalAPIError("Ticket not found or already closed.", 409);

    const ticket = await AppDataSource.createQueryBuilder()
      .select()
      .from(Tickets, "tickets")
      .where("id = :id", { id: req.params.id })
      .execute();

    const output: ITicketManageOutput = ticket;
    return output;
  }
}
