import axios from "axios";

/**
 * get an approximate location for a user based on their IP address
 * call if no zip has been entered
 */

export interface Response {
    // has more fields than this
    city: string;
    latitude: number;
    longitude: number;
    postal_code: string;
}

/**
 * WILL THROW ERRORS
 * @throws Error
 */
export const fetchIpLocation = async () => {
    const url = "https://www.iplocate.io/api/lookup";
    const response = await axios.get<Response>(url);
    const {latitude, longitude, postal_code} = response.data;
    return {
        zip: postal_code,
        latLon: {
            lat: latitude,
            lon: longitude,
        }
    }
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
