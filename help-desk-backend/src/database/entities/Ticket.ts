import { IsBoolean, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./Accounts.js";

@Entity()
export class Tickets {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 128, nullable: false})
    @IsString({message: 'The subject of the ticket should be a string'})
    subject: string;

    @Column({type: 'varchar', length: 512, nullable: false})
    @IsString({message: 'The description of the ticket should be a string'})
    description: string;

    @Column({type: 'boolean', nullable: false, default: false})
    @IsBoolean({message: 'The closed flag should be a boolean'})
    closed: boolean;

    @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    // The creator of the ticket
    @ManyToOne(() => Accounts, (account: Accounts) => account.id, {})
    account: Accounts;
}
