/**
 * attempt to return a string like "Houston, TX"
 */
import {UserLocation} from "./types";
import {stateAbbrToName, stateNameToAbbr} from "./stateAbbr";

export const useCityState = (loc: Partial<UserLocation>): string | undefined => {

    const city = loc.city;
    const state = getStateAbbr(loc);

    if ( city && state ) {
        return `${city}, ${state}`;
    }

    //TODO: extract from zip code

    /*
     * https://github.com/scpike/us-state-county-zip
     * https://simplemaps.com/data/us-zips
     * https://www.unitedstateszipcodes.org/ne/#zips-list
     */

    //TODO: extract from lat/lon
}


const getStateName =  (loc: Partial<UserLocation>): string | undefined => {
    if ( loc.stateName ) {
        return loc.stateName;
    } else if ( loc.stateCode ) {
        return stateAbbrToName(loc.stateCode);
    }
}

const getStateAbbr =  (loc: Partial<UserLocation>): string | undefined => {
    if ( loc.stateName ) {
        return stateNameToAbbr(loc.stateName);
    } else if ( loc.stateCode ) {
        return loc.stateCode;
    }
}
