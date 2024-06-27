import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserPermissions } from "../../interfaces/system/IAuth";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: UserPermissions;
}
