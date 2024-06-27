import { Tickets } from "../../../database/entities/Ticket";

export type ITicketsListOutput = {tickets: Omit<Tickets, 'description'>[], count: number};