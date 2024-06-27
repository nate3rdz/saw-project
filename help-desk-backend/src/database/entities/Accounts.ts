import { IsDate, IsEmail, IsInt, IsString, Length, Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "./Permissions.js";

@Entity()
export class Accounts {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 24, nullable: false, unique: true})
    @IsString({message: 'The username should be a string'})
    @Length(2, 24, {message: 'The username should be 2 to 24 chars long'})
    username: string;

    @Column({type: 'varchar', length: 129, nullable: false, select: false})
    @IsString({message: 'The password should be a string'})
    @Length(129, 129, {message: 'The password should be 129 chars long'})
    password: string;

    @Column({type: 'varchar', length: 56, nullable: false, unique: true, select: false})
    @IsEmail({require_tld: true}, {message: 'Email should be a valid email'})
    email: string;

    @CreateDateColumn()
    @IsDate({message: 'RegisterDate should be a date'})
    registerDate: string;

    @ManyToMany(() => Permissions, (permission: Permissions) => permission.id, {
        cascade: true
    })
    @JoinTable()
    permissions: Permissions[];
}
