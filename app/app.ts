import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as env from 'dotenv';
import * as session from 'express-session';
import * as errorHandler from 'errorhandler';
import {DBConnection} from "./db/DB";
import {Scraper} from "./scraper/Scraper";

export class Server {

    app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.updaters();
    }

    config() {
        env.config();  // loads .env file if exists

        this.app.use(express.static(path.join(path.dirname(__dirname), 'public')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(session({
            secret: process.env.app_secret,
            resave: false,
            saveUninitialized: true,
        }));

        // error 404 
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());
    }

    private updateDatabase(): void {
        DBConnection().schema.dropTableIfExists('knex_migrations_lock')
            .then(any => DBConnection().migrate.latest())
            .catch(err => console.error(err))
    }

    private updaters() {
        new Scraper(process.env.scrape_url, process.env.scrape_token, process.env.scrape_timeout);
    }
}
