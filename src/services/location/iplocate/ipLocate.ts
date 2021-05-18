/* eslint-disable camelcase */
import axios from "axios";
import { LatLon, UserLocation } from "../types";

/**
 * Get an approximate location for a user based on their IP address.
 * Call only if no zip has been entered.
 */

/**
 * The relevant properties from the iplocate.io API response.
 * Note: has more fields than this.
 */
export interface Response {
  country: string;
  country_code: string;
  city: string | null;
  latitude: number;
  longitude: number;
  postal_code: string | null;
  subdivision: string | null;
}

/**
 * The location result always has a lat/lon
 * and may have other additional properties.
 */
type LocationFromIp = LatLon & Partial<UserLocation>;

/**
 * Attempt to fetch an estimated location from the iplocate.io API.
 *
 * Will throw errors (reject the Promise) when the request fails.
 */
export const fetchIpLocation = async (): Promise<LocationFromIp> => {
  const url = "https://www.iplocate.io/api/lookup";
  const response = await axios.get<Response>(url);
  const {
    latitude,
    longitude,
    postal_code,
    country,
    country_code,
    city,
    subdivision,
  } = response.data;
  const loc: LocationFromIp = {
    lat: latitude,
    lon: longitude,
  };
  // API uses null instead of undefined, so need to check values before including
  if (postal_code !== null) {
    loc.zip = postal_code;
  }
  if (country !== null) {
    loc.countryName = country;
  }
  if (country_code !== null) {
    loc.countryCode = country_code;
  }
  if (city !== null) {
    loc.city = city;
  }
  if (subdivision !== null) {
    loc.stateName = subdivision;
  }
  return loc;
};

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
