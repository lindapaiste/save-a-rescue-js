import {RescueOrg} from "./types";
import LatLonObj from "geodesy/latlon-spherical";
import distance from "./turf";
import {LatLon} from "../location/types";
//TODO: need to convert zip to lat/lon if only zip is entered




/**
 * distance between lat/lon as a raw number which is ok for sorting, but doesn't mean anything
 * @param location
 */
export const rawDistance = (location: LatLon) => (rescue: RescueOrg): number => {
    if ( ! rescue.location.lat || ! rescue.location.lng ) {
        return 10000;
    }
    return Math.sqrt(
        ( location.lat - rescue.location.lat ) ** 2
        + (location.lon - rescue.location.lng ) ** 2
    );
}

/**
 * use an arbitrary large number so that it gets sorted to the end of the list
 */
export const INVALID_DISTANCE = 10000;

export const isValidDistance = (d: number) => d !== INVALID_DISTANCE;

export const rescueDistance__ = (location: LatLon) => (rescue: RescueOrg): number => {
    try {
        const uLoc = new LatLonObj(location.lat, location.lon);
        const rLoc = new LatLonObj(rescue.location.lat, rescue.location.lng);
        return uLoc.distanceTo(rLoc);
    } catch (e) {
        return 10000;
    }
}

export const rescueDistance = (location: LatLon) => (rescue: RescueOrg): number => {
    try {
        return distance([location.lat, location.lon], [rescue.location.lat, rescue.location.lng], {units: "miles"});
    } catch (e) {
        return 10000;
    }
}

export type WithDistance<T> = T & {distance: number}

export const withDistance = (location: LatLon) => (rescue: RescueOrg): WithDistance<RescueOrg> => {
    return {
        ...rescue,
        distance: rescueDistance(location)(rescue),
    }
}

export const nearestFirst = (location: LatLon) => (array: RescueOrg[]): WithDistance<RescueOrg>[] => {
    const rescues = array.map(withDistance(location));
    console.log(array);
    const res = rescues.sort((a, b) => a.distance - b.distance );
    console.log({res, rescues});
    return res;
}
