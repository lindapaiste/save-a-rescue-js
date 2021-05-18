import { UserLocation } from "./types";
import { stateNameToAbbr } from "./formatting/stateAbbr";

/**
 * attempt to create a string like "Houston, TX"
 */

const getStateAbbr = (loc: Partial<UserLocation>): string | undefined => {
  if (loc.stateCode) {
    return loc.stateCode.toUpperCase();
  }
  if (loc.stateName) {
    return stateNameToAbbr(loc.stateName);
  }
  return undefined;
};

export const useCityState = (
  loc: Partial<UserLocation>
): string | undefined => {
  const { city } = loc;
  const state = getStateAbbr(loc);

  if (city && state) {
    return `${city}, ${state}`;
  }
  return undefined;

  // TODO: extract from zip code

  /*
   * https://github.com/scpike/us-state-county-zip
   * https://simplemaps.com/data/us-zips
   * https://www.unitedstateszipcodes.org/ne/#zips-list
   */

  // TODO: extract from lat/lon
};
