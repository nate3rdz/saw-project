import { IsBoolean, IsDate, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./Accounts.js";
import { Tickets } from "./Ticket.js";

@Entity()
export class TicketAnswers {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 512, nullable: false})
    @IsString({message: 'The text of the answer should be a string'})
    text: string;

    @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    // The ticket to which the answer is related
    @ManyToOne(() => Tickets, (ticket: Tickets) => ticket.id, {})
    ticket: Tickets;

    // The creator of the answer
    @ManyToOne(() => Accounts, (account: Accounts) => account.id, {})
    account: Accounts;
}
