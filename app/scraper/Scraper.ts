import {get} from 'request';

/**
 * Created by Juju on 08/03/2017.
 */
export class Scraper {

    private url: string;
    private token: string;

    constructor(url: string, token: string, interval: number) {
        if(!url || !token || !interval) { throw "Missing Scraping params"; }

        this.url = url;
        this.token = token;

        setTimeout(() => this.scrapeSite(), interval);
        this.scrapeSite();
    }

    private scrapeSite() {
        get(this.url, { auth: { bearer: this.token } }, (err, res, body) => {
            if(err) {
                console.error(err);
                return;
            }

            console.log(body);
        })
    }
}