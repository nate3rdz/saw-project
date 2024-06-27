import { EntityTarget, FindManyOptions, FindOptionsRelationByString, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../database/data/data-source.js";
import Environment from "../env.js";

export default class PaginationService {
    constructor() {

    }

    static async paginate<R extends FindManyOptions<ObjectLiteral>, T extends ObjectLiteral, Q extends (keyof T)[]>(
        query: R,
        entity: EntityTarget<T>,
        orderBy?: {property: string, order: 'ASC' | 'DESC'},
        exclude?: Q, // set of properties to exclude from the query
    ): Promise<{data: Omit<T, typeof exclude[number]>[], count: number}> {
        const environment = Environment.getInstance();
        const repo = AppDataSource.getRepository(entity);

        let queryBuilder: SelectQueryBuilder<T> = repo.createQueryBuilder('entity');

        if (query.where) {
            queryBuilder = queryBuilder.where(query.where);
        }

        if (orderBy) {
            queryBuilder = queryBuilder.orderBy(`entity.${orderBy.property}`, orderBy.order);
        }

        const columns = repo.metadata.columns.map(column => column.propertyName);
        const selectionColumns = columns.filter(column => !exclude?.includes(column));

        queryBuilder = queryBuilder.select(selectionColumns.map(column => `entity.${column}`));

        if (query.relations) {
            for (const relation of query.relations as FindOptionsRelationByString ) {
                queryBuilder = queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
            }
        }

        // skip + take (limit)
        queryBuilder = queryBuilder.skip(query.skip || 0).take(query.take || environment.config.pagination.defaultPageSize);

        const [data, count] = await queryBuilder.getManyAndCount();
        return {data: data as Omit<T, typeof exclude[number]>[], count};
    }
}