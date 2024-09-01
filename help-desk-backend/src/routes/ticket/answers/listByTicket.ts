import { Response } from "express";
import Endpoint from "../../../classes/Endpoint.js";
import InternalAPIError from "../../../classes/InternalAPIError.js";
import AppDataSource from "../../../database/data/data-source.js";
import { Tickets } from "../../../database/entities/Ticket.js";
import { TicketAnswers } from "../../../database/entities/TicketAnswers.js";
import ITicketAnswerListByTicket, {
  ticketAnswerListByTicketInputParamsSchema,
} from "../../../interfaces/endpoints-input/ticket/answers/ITicketAnswerListByTicket.js";
import { ITicketAnswerListByTicketOutput } from "../../../interfaces/endpoints-output/ticket/answers/ITicketAnswerListByTicket.js";
import IEndpointMiddleware from "../../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../../interfaces/endpoints-system/IEndpointValidator";

export class TicketAnswerListByTicket extends Endpoint<
  ITicketAnswerListByTicket,
  Response,
  ITicketAnswerListByTicketOutput
> {
  constructor() {
    const middlewares: IEndpointMiddleware[] = [];
    super(middlewares);

    this.auth = true;
    this.function = this.fn;
    this.method = "get";
    this.path = "/tickets/:id/answers";
  }

  setValidators() {
    // params validator
    const paramsValidator: IEndpointValidator = {
      schema: ticketAnswerListByTicketInputParamsSchema,
      dest: "endpoint-input",
      target: "params",
    };

    this.validators.push(paramsValidator);
  }

  async fn(
    req: ITicketAnswerListByTicket,
    res: Response
  ): Promise<ITicketAnswerListByTicketOutput> {
    const ticket = await AppDataSource.getRepository(Tickets).findOne({
      where: { id: Number(req.params.id) },
      relations: ["account"],
    });
    if (!ticket) throw new InternalAPIError("Ticket not found.", 404);

    // lets use a more accurate permission checking to see if the user is the owner of the ticket or if the user is an admin with proper rights
    if (this.innerData.account.id !== ticket.account.id) {
      const hasPermission = !!this.innerData.account.permissions.find(
        (element) => {
          if (element.name === "manage-tickets") return true;
        }
      );

      if (!hasPermission)
        throw new InternalAPIError(
          "You can't list answers of a ticket that wasn't created by you.",
          403
        );
    }

    const answers = await AppDataSource.getRepository(
      TicketAnswers
    ).findAndCount({
      where: { ticket: { id: ticket.id } },
      relations: ["account"],
      order: {
        createdAt: "ASC",
      },
    });

    return { answers: answers[0], count: answers[1] };
  }
}
