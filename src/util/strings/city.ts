import { startCase } from "lodash";

export const isAllLowerCase = (text: string): boolean => {
  return text === text.toLowerCase();
};

export const isAllUpperCase = (text: string): boolean => {
  return text === text.toUpperCase();
};

/**
 * Capitalize the first letter of each word.
 * There may be edge cases where title-casing is wrong.  Using boolean preserve=true only applies this conditionally by
 * checking for "bad" strings before cleaning, looking for all upper or all lower case.  Assumes that any string with a
 * mix of upper and lower-case letters is already properly cased.  This may or may not be correct.
 */
export const proper = (text = "", preserve = false) => {
  if (preserve) {
    if (isAllLowerCase(text) || isAllUpperCase(text)) {
      return startCase(text.toLowerCase());
    }
    return text;
  }
  return startCase(text.toLowerCase());
};

/**
 * fix inconsistent casing in API results, ie "HOUSTON, Tx"
 *
 */

export const cityState = (props: { city?: string; state?: string }) => {
  // lodash can take undefined -- handles as empty string
  const city = proper(props.city);
  const state = (props.state ?? "").toUpperCase();
  if (!city) {
    return state; // TODO: convert to full state name
  }
  return state ? `${city}, ${state}` : city;
};
