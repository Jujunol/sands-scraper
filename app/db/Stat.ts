import * as moment from 'moment';
import {DB, Query} from './DB';

/**
 * Created by Juju on 08/03/2017.
 */
export class Stat {

    constructor(unix: number, traffic: number) {
        const time: moment.Moment = moment(unix);
        const date: string = time.format();
        const hour: number = +time.format('HH');

        this.self()
            .insert({
                date: date,
                hour: hour,
                unix: unix,
                traffic: traffic,
            })
            .catch(err => console.error(err));
    }

    private self(): Query {
        return DB('stat');
    }

    latest(): Query {
        return this.self()
            .orderBy('unix', 'desc')
            .limit(1);
    }

}