/**
 * Conversion between US state / CA province names and abbreviations
 *
 * Source: https://gist.github.com/calebgrove/c285a9510948b633aa47
 */

const usStates = [
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["American Samoa", "AS"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["Armed Forces Americas", "AA"],
  ["Armed Forces Europe", "AE"],
  ["Armed Forces Pacific", "AP"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District Of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Guam", "GU"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Marshall Islands", "MH"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Northern Mariana Islands", "NP"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Puerto Rico", "PR"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["US Virgin Islands", "VI"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
];

const caProvinces = [
  ["Alberta", "AB"],
  ["British Columbia", "BC"],
  ["Manitoba", "MB"],
  ["New Brunswick", "NB"],
  ["Newfoundland", "NF"],
  ["Northwest Territory", "NT"],
  ["Nova Scotia", "NS"],
  ["Nunavut", "NU"],
  ["Ontario", "ON"],
  ["Prince Edward Island", "PE"],
  ["Quebec", "QC"],
  ["Saskatchewan", "SK"],
  ["Yukon", "YT"],
];

const regions = usStates.concat(caProvinces);

/**
 * Map object where the keys are the region names (lowercase)
 * and the values are the abbreviations (uppercase).
 * Convert all name keys to lowercase for clean comparison.
 */
const mapNameToAbbr: Record<string, string> = Object.fromEntries(
  regions.map(([name, abbr]) => [name.toLowerCase(), abbr])
);

/**
 * Map object where the keys are the 2-letter abbreviations (uppercase)
 * and the values are the region names (properly-cased).
 */
const mapAbbrToName: Record<string, string> = Object.fromEntries(
  regions.map(([name, abbr]) => [abbr, name])
);

/**
 * Convert a two-letter state/province abbreviation to the name.
 */
export const stateAbbrToName = (abbr: string): string | undefined =>
  mapAbbrToName[abbr.toUpperCase()];

/**
 * Convert a state or province name to its abbreviation.
 */
export const stateNameToAbbr = (name: string): string | undefined =>
  mapNameToAbbr[name.toLowerCase()];
