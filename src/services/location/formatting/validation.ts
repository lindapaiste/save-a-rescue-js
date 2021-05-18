import {
  LatLon,
  UserLocation,
  ValidLocation,
  ValidUserLocation,
} from "../types";
import { FilterLocation } from "../../rescuegroups-api/schema/request";

/**
 * from https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
 * zip looks like A1A 1A1, but wil special rules about disallowed characters
 */

const ca = new RegExp(
  /([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])[ -]?(\d[ABCEGHJ-NPRSTV-Z]\d)/i
);
/**
 * matches 5 digit or 5 digit + 4, with or without hyphen
 * do not need start and end matchers because that is implied, if not using global '/g'
 */
const us = new RegExp(/^\d{5}(-?\d{4})?$/);

export const isValidZip = (zip: string): boolean => {
  return us.test(zip) || ca.test(zip);
};

/**
 * rescue groups API REQUIRES that there be a space in canadian zip codes
 * return a normalized zip or undefined if invalid
 */
export const normalizeZip = (zip: string): string | undefined => {
  if (us.test(zip)) {
    return zip;
  }
  const match = zip.match(ca);
  if (match) {
    // match[0] is the whole string, 1 and 2 are the two parts
    return `${match[1]} ${match[2]}`;
  }
  return undefined;
};

/**
 * drop all excess properties
 */
export function extractLocation(loc: undefined): undefined;
export function extractLocation(loc: ValidUserLocation): ValidUserLocation;
export function extractLocation(
  loc: Partial<UserLocation> | undefined
): ValidUserLocation | undefined;
export function extractLocation(
  loc: Partial<UserLocation> = {}
): ValidLocation | undefined {
  const { lat, lon, coords, zip } = loc;
  if (lat && lon) {
    return { lat, lon };
  }
  if (zip) {
    return { zip };
  }
  if (coords) {
    return { coords };
  }
  return undefined;
}

/**
 * check if a partial object has some form of location defined
 */
export const hasLocation = <T extends Partial<UserLocation>>(
  loc: T
): loc is T & ValidUserLocation => {
  const { lat, lon, coords, zip } = loc;
  return (!!lat && !!lon) || !!zip || !!coords;
};

export const isCoords = <T extends Partial<UserLocation>>(
  loc: T
): loc is T & { coords: string } => {
  return !!loc.coords;
};

export const isZip = <T extends Partial<UserLocation>>(
  loc: T
): loc is T & { zip: string } => {
  return !!loc.zip;
};

export const isLatLon = <T extends Partial<LatLon>>(
  loc: T
): loc is T & LatLon => {
  return loc.lat !== undefined && loc.lon !== undefined;
};

/**
 * allow the user to enter a 9-digit zip and show it as valid, but behind the scenes RescueGroups can only handle 5-digits
 */
export const noNineDigits = (zip: string): string => {
  return zip.length >= 9 ? zip.substr(0, 5) : zip;
};

export const toFilterLocation = ({
  coords,
  zip,
  lat,
  lon,
}: ValidUserLocation): FilterLocation => {
  if (lat && lon) {
    return { lat, lon };
  }
  if (zip) {
    return { postalcode: noNineDigits(zip) };
  }
  return { coordinates: coords || "" };
};
