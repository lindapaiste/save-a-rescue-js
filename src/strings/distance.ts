import {isDefined} from "@lindapaiste/ts-helpers";
import round from "lodash/round";
/**
 * convert a number into `n mile(s) away` string
 * round to a whole number unless less than 1 mile
 */
export const milesAway = (distance: number) => {
    const rounded = round(distance);
    const s = rounded > 1 ? 's' : ''; // plural only if > 1
    const number = distance < 1 ? '< 1' : rounded; // show < 1 instead of 0
    return `${number} mile${s} away`;
}

/**
 * can show the distance when known, but fall back to displaying the city and state otherwise
 */
export interface DistanceCityState {
    distance?: number;
    citystate?: string;
}

export const distanceOrLocation = ({distance, citystate}: DistanceCityState): string | undefined => {
    if ( isDefined(distance) ) {
        return milesAway(distance);
    } else if ( isDefined(citystate) ) {
        return citystate;
    }
}
