import knex = require('knex');
import {env} from "../config/Config";
import Bluebird = require("bluebird");

/**
 * Created by Juju on 02/05/2017.
 */
export class DB {

    private static conn: knex;

    static get knex(): knex {
        if(this.conn) { return this.conn; }

        const pool: knex.PoolConfig = {
            min: env('db_pool_min', 1),
            max: env('db_pool_max', 1),
        };

        const config: knex.Config = {
            client: env('db_client'),
            connection: env('db_connection', {
                host: env('db_host'),
                database: env('db_name'),
                user: env('db_username'),
                password: env('db_password'),
            }),
            pool: pool,
        };

        this.conn = knex(config);
        return this.conn;
    }

    static table(name: string): Query {
        return this.knex(name);
    }

}

export type Query = knex.QueryBuilder;