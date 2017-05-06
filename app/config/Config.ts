/**
 * Created by Juju on 25/04/2017.
 */
export function env(key: string, fallback?: any): any {
    return process.env[key] || fallback;
}