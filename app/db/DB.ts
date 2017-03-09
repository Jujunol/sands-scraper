import * as knex from 'knex';

/**
 * Created by Juju on 08/03/2017.
 */
let connection = null;
export function DBConnection() {
    if(!connection) {
        connection = knex({
            client: process.env.db_client,
            connection: {
                host: process.env.db_host,
                database: process.env.db_name,
                user: process.env.db_user,
                password: process.env.db_password,
            },
        });
    }
    return connection;
}

export function DB(table: string): knex.QueryBuilder {
    return DBConnection()(table);
}

export type Query = knex.QueryBuilder;