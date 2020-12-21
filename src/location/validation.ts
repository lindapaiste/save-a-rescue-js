import {LatBoth, LatEither, LatLng, LatLon, UserLocation, ValidUserLocation} from "./types";
import {FilterLocation} from "../clientRg/request";

/**
 * from https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
 * zip looks like A1A 1A1, but wil special rules about disallowed characters
 */

const ca = new RegExp(/([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])[ -]?(\d[ABCEGHJ-NPRSTV-Z]\d)/i);
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
}

/**
 * drop all excess properties
 */
export function extractLocation (loc: undefined): undefined
export function extractLocation (loc: ValidUserLocation): ValidUserLocation
export function extractLocation (loc: Partial<UserLocation> | undefined): ValidUserLocation | undefined
export function extractLocation (loc: Partial<UserLocation> = {}): ValidUserLocation | undefined {
    const {lat, lon, coords, zip} = loc;
    return (lat && lon) ? {lat, lon} :
        (zip) ? {zip} :
            (coords) ? {coords} : undefined;
}

/**
 * check if a partial object has some form of location defined
 */
export const hasLocation = <T extends Partial<UserLocation>>(loc: T): loc is T & ValidUserLocation => {
    const {lat, lon, coords, zip} = loc;
    return (!!lat && !!lon) || !!zip || !!coords;
}

export const isCoords = <T extends Partial<UserLocation>>(loc: T): loc is T & { coords: string } => {
    return !!loc.coords;
}

export const isZip = <T extends Partial<UserLocation>>(loc: T): loc is T & { zip: string } => {
    return !!loc.zip;
}

/**
 * want to be able to use LatLng and LatLon interchangeably
 */
export const isLatLng = <T extends Partial<LatLng>>(loc: T): loc is T & LatLng => {
    return loc.lat !== undefined && loc.lng !== undefined;
}

export const isLatLon = <T extends Partial<LatLon>>(loc: T): loc is T & LatLon => {
    return loc.lat !== undefined && loc.lon !== undefined;
}

/**
 * is two functions to avoid really stupid TS errors https://tsplay.dev/4w1elw
 */
/**
 * works fine when not using `T extends`
 */
const fillLonLng_ = (loc: LatEither): LatBoth => {
    if (isLatLon(loc)) {
        return {...loc, lng: loc.lon};
    } else {
        return {...loc, lon: loc.lng};
    }
}

/**
 * works fine with `T extends` when extracting out the fill logic
 */
export const fillLonLng = <T extends LatEither>(loc: T): T & LatBoth => {
    return {
        ...fillLonLng_(loc),
        ...loc,
    }
}

export const getLat = (loc: LatEither): number => loc.lat;

export const getLon = (loc: LatEither): number => isLatLon(loc) ? loc.lon : loc.lng;

export const toFilterLocationCompatEither = (loc: ValidUserLocation | FilterLocation & Partial<ValidUserLocation>): FilterLocation => {
    /*const extracted = extractLocation(loc);
    if ( extracted === undefined ) {
        if ("postalcode" in loc || "coordinates" in loc) {
            return loc;
        } else {
            //TODO: throw error? "as" assert?  should never be here
            return {
                coordinates: ""
            }
        }
    }
    if ( isLatLon(extracted) ) {
        return extracted;
    }*/

    if (isLatLon(loc)) {
        return {
            lat: loc.lat,
            lon: loc.lon,
        } // don't want to pass the whole object through to RG API
    }
    if (isLatLng(loc)) {
        return {
            lat: loc.lat,
            lon: loc.lng,
        }
    }
    if (isZip(loc)) {
        return {
            postalcode: loc.zip
        }
    }
    if ("postalcode" in loc || "coordinates" in loc) {
        return loc;
    } else {
        return {
            coordinates: loc.coords
        }
    }
}

export const toFilterLocation = ({coords, zip, lat, lon}: ValidUserLocation): FilterLocation => {
    if ( lat && lon ) {
        return {lat, lon};
    } else if ( zip ) {
        return {postalcode: zip};
    } else {
        return {coordinates: coords || ""}
    }
}

export const _getZip = (location?: FilterLocation): string | undefined => {
    if (location && 'postalcode' in location) {
        return location.postalcode.toString();
    }
}
