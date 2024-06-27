import { genSaltSync, hashSync } from "bcrypt";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import Environment from "../../env.js";
import { Accounts } from "../entities/Accounts.js";

const environment = Environment.getInstance();

@EventSubscriber()
export default class AccountSubscriber implements EntitySubscriberInterface{

    listenTo(){ // This means that this subcriber will listen only to Accounts entity events
        return Accounts;
    }

    beforeInsert(event: InsertEvent<Accounts>) { // Hooks that runs before the insertion of a new record
        if(event.entity.password === '' || event.entity.password === null) throw new Error('Invalid password given');

        // Password hasher.
        const salt = genSaltSync(Number(environment.config.jwt.salt));
        event.entity.password = hashSync(event.entity.password, salt);
    }

    beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
        if(event.entity.Password) {
            const salt = genSaltSync(Number(environment.config.jwt.salt));
            event.entity.Password = hashSync(event.entity.Password, salt);
        }
    }
}