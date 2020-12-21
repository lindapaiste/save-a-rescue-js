import axios from "axios";
import {UserLocation} from "./types";

/**
 * get an approximate location for a user based on their IP address
 * call if no zip has been entered
 */

export interface Response {
    // has more fields than this
    country: string;
    country_code: string;
    city: string | null;
    latitude: number;
    longitude: number;
    postal_code: string | null;
    subdivision: string | null;
}

/**
 * WILL THROW ERRORS
 * @throws Error
 */
export const fetchIpLocation = async (): Promise<Partial<UserLocation>> => {
    const url = "https://www.iplocate.io/api/lookup";
    const response = await axios.get<Response>(url);
    const {latitude, longitude, postal_code, country, country_code, city, subdivision} = response.data;
    const loc: Partial<UserLocation> = {
        lat: latitude,
        lon: longitude,
    }
    //API uses null instead of undefined, so need to check values before including
    if ( postal_code !== null ) {
        loc.zip = postal_code;
    }
    if ( country !== null ) {
        loc.countryName = country;
    }
    if ( country_code !== null ) {
        loc.countryCode = country_code;
    }
    if ( city !== null ) {
        loc.city = city;
    }
    if ( subdivision !== null ) {
        loc.stateName = subdivision;
    }
    return loc;
}


/**
 * resources for estimating location:
 * https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
 *
 * user to ip:
 * unlimited https://www.ipify.org/ - offers location service but only 1000 per month free
 *
 * ip to location:
 * 1000 per day free https://www.npmjs.com/package/node-iplocate
 * 1000 per day free https://ipgeolocation.io/pricing.html
 * 1000 per day free https://iplocate.docs.apiary.io/#introduction/api-limits
 *
 * user to location:
 * 12000 per month free https://ip-api.io/
 */
