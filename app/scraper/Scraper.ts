import {get} from 'request';
import {Stat} from "../db/Stat";

/**
 * Created by Juju on 08/03/2017.
 */
export class Scraper {

    private url: string;
    private token: string;
    private interval: number;
    private errorInterval: number = 1000 * 60;

    constructor(url: string, token: string, interval: number) {
        if(!url || !token || !interval) { throw "Missing Scraping params"; }

        this.url = url;
        this.token = token;
        this.interval = interval;

        this.scrapeSite();
    }

    private scrapeSite() {
        get(this.url, { auth: { bearer: this.token } }, (err, res, body) => {
            if(err) {
                console.error(err);
                setTimeout(() => this.scrapeSite(), this.errorInterval);
                return;
            }

            const json: ScrapeResponse = JSON.parse(body);
            const stats: number[] = json.stats["24h"];

            Stat.latest().first().then(stat => {
                console.log(stat);
                let iter: number = 0;
                let unix: number = stat ? stat.unix : 0;

                console.log("About to loop", {
                    iter,
                    unix,
                    length: stats.length,
                    target: stats[iter],
                });

                while(iter < stats.length - 1 && stats[iter][0] <= unix) { iter++; }
                for(; iter < stats.length - 1; iter++) {
                    Stat.create(stats[iter][0], stats[iter][1]);
                }

                Stat.saveQueue();
                setTimeout(() => this.scrapeSite(), this.interval);
            });
        })
    }
}

interface ScrapeResponse {
    stats: Object,
}