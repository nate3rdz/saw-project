import { DataSource } from "typeorm";
import Environment from '../../env.js';
import { Accounts } from "../entities/Accounts.js";
import { Permissions } from "../entities/Permissions.js";
import { Tickets } from "../entities/Ticket.js";
import { TicketAnswers } from "../entities/TicketAnswers.js";
import AccountSubscriber from "../subscribers/AccountSubscriber.js";

const environment = Environment.getInstance();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: environment.server.database.host,
    port: environment.server.database.port,
    username: environment.server.database.user,
    password: environment.server.database.password,
    database: environment.server.database.name,
    synchronize: true,
    logging: false,
    entities: [Accounts, Permissions, TicketAnswers, Tickets],
    migrations: [],
    subscribers: [AccountSubscriber],
});

