import {MaybeDogOrCat} from "../strings/species";
import {AgeGroup, Sex, SizeGroup} from "../strings/enums";
import {UserLocation} from "../location/types";
import {SearchFormState} from "../search-box/types";
import first from "lodash/first"
import {isNonNullable, isNotEmpty} from "@lindapaiste/ts-helpers";
import {getBreed} from "../clientRg/SearchRequest";
import {useSelector} from "../redux/store";
import {getAttribute} from "../redux/rgSelectors";

/**
 * if selecting more than one of anything, drop the additional and use just the first for the canonical and the title
 */
export interface TitleProps {
    species?: MaybeDogOrCat;
    sex?: Sex;
    breed?: string;
    location?: Pick<UserLocation, 'city' | 'stateCode'>;
    size?: SizeGroup;
    age?: AgeGroup;
}

/**
 * special handling:
 * - no species becomes "Cat or Dog"
 * - "Baby" gets dropped from age and instead changes species to "Kitten"/"Puppy"
 * -
 *
 * formula: `Adopt a ${size} ${age} ${sex} ${breed} ${species} ${location}`
 *
 */
export const titleString = ({species, sex, breed, location, size, age}: TitleProps): string => {
    const pieces = [
        "Adopt a",
        size,
        age === "Baby" ? undefined : age,
        sex,
        breed,
        species, //TODO
        location === undefined ? "Your Area" : `in ${location.city} ${location.stateCode}`
    ];

    return pieces.filter(isNonNullable).join(' ');

//    const str = `Adopt a ${size} ${age} ${sex} ${breed} ${species} ${location}`
}

export const useTitleString = (state: Partial<SearchFormState>): string => {
    const {sizes, sex, location, species, ages} = state;

    const breed = first(getBreed(state));

    const breedName = useSelector(state => {
        if ( breed === undefined ) {
            return undefined;
        }
        return typeof breed === "string"
            ? getAttribute("breeds", breed, "name")
            : breed.label
    });

    const pieces = [
        "Adopt a",
        first(sizes),
        first(ages) === "Baby" ? undefined : first(ages),
        sex?.length === 1 ? sex[0] : undefined,

    ];

    return pieces.filter(isNonNullable).join(' ');

}
