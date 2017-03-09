import * as moment from 'moment';
import {DB, Query} from './DB';

/**
 * Created by Juju on 08/03/2017.
 */
export class Stat {

    private static queue: StatType[] = [];

    private static self(): Query {
        return DB('stat');
    }

    static latest(): Query {
        return Stat.self()
            .orderBy('unix', 'desc')
            .limit(1);
    }

    static create(unix: number, traffic: number): void {
        const time: moment.Moment = moment.unix(unix).utc();
        const date: string = time.format();
        const hour: number = +time.format('HH');

        Stat.queue.push({
            date: date,
            hour: hour,
            unix: unix,
            traffic: traffic,
        })
    }

    static saveQueue(): void {
        Stat.self().insert(this.queue)
            .catch(err => console.error(err));
        this.queue = [];
    }

}

interface StatType {
    date: string,
    hour: number,
    unix: number,
    traffic: number,
}