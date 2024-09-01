import { Response } from "express";
import Endpoint from "../../../classes/Endpoint.js";
import InternalAPIError from "../../../classes/InternalAPIError.js";
import AppDataSource from "../../../database/data/data-source.js";
import { Tickets } from "../../../database/entities/Ticket.js";
import { TicketAnswers } from "../../../database/entities/TicketAnswers.js";
import ITicketAnswerInput, {
  ticketAnswerInputBodySchema,
  ticketAnswerInputParamsSchema,
} from "../../../interfaces/endpoints-input/ticket/answers/ITicketAnswer.js";
import { ITicketAnswerOutput } from "../../../interfaces/endpoints-output/ticket/answers/ITicketAnswer.js";
import IEndpointMiddleware from "../../../interfaces/endpoints-system/IEndpointMiddleware";
import IEndpointValidator from "../../../interfaces/endpoints-system/IEndpointValidator";

export class TicketAnswer extends Endpoint<
  ITicketAnswerInput,
  Response,
  ITicketAnswerOutput
> {
  constructor() {
    const middlewares: IEndpointMiddleware[] = [];
    super(middlewares);

    this.auth = true;
    this.function = this.fn;
    this.method = "post";
    this.path = "/tickets/:id";
  }

  setValidators() {
    // body validator
    const inputBodyValidator: IEndpointValidator = {
      schema: ticketAnswerInputBodySchema,
      dest: "endpoint-input",
      target: "body",
    };

    // params validator
    const paramsValidator: IEndpointValidator = {
      schema: ticketAnswerInputParamsSchema,
      dest: "endpoint-input",
      target: "params",
    };

    this.validators.push(inputBodyValidator, paramsValidator);
  }

  async fn(
    req: ITicketAnswerInput,
    res: Response
  ): Promise<ITicketAnswerOutput> {
    const ticket = await AppDataSource.getRepository(Tickets).findOne({
      where: { id: Number(req.params.id) },
      relations: ["account"],
    });
    if (!ticket) throw new InternalAPIError("Ticket not found.", 404);

    if (ticket.closed)
      throw new InternalAPIError(
        "The ticket is closed: you can't add other answers.",
        409
      );

    // lets use a more accurate permission checking to see if the user is the owner of the ticket or if the user is an admin with proper rights
    if (this.innerData.account.id !== ticket.account.id) {
      const hasPermission = !!this.innerData.account.permissions.find(
        (element) => {
          if (element.name === "manage-tickets") return true;
        }
      );

      if (!hasPermission)
        throw new InternalAPIError(
          "You can't answer a ticket that was not created by you.",
          403
        );
    }

    const answer: TicketAnswers = new TicketAnswers();

    answer.text = req.body.text;
    answer.ticket = ticket;
    answer.account = this.innerData.account;

    const result = await AppDataSource.getRepository(TicketAnswers).insert(
      answer
    );
    if (result.identifiers === null)
      throw new InternalAPIError("Error while creating a new answer.", 500);

    return await AppDataSource.getRepository(TicketAnswers).findOne({
      where: { id: Number(result?.identifiers[0]?.id) },
    });
  }
}
