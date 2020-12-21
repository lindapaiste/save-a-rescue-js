import {SearchFormState} from "../search-box/types";
import qs from "qs";
import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {idToSlug, isDogOrCat, slugToId} from "../strings/species";
import {extractLocation, hasLocation} from "../location/validation";
import {isUnlimited} from "../search-box/fields/DistanceSelect";
import isEmpty from "lodash/isEmpty";

/**
 * just change species and location -- everything else is fine
 */
interface Mapped_Url {
    pet?: string;
    zip?: string;
    lat?: number;
    lon?: number;
}
type Mapped_Search = Pick<Partial<SearchFormState>, 'location' | 'species'>

export type URLSearchFormState = Omit<Partial<SearchFormState>, keyof Mapped_Search> & Mapped_Url;

/**
 * most values stay the same, but I want to drop empties
 * qs can drop empty arrays, but not when using arrayFormat=comma
 * 12/4/2020 - not using comma array format because it becomes impossible for qs to know that it is an array at decode time
 */
const mapToUrl = (state: Partial<SearchFormState>): URLSearchFormState => {
    const {location, species, distance, ...rest} = state;
    /*
    const res: URLSearchFormState = {
        ...location,
        pet: species,
        distance: isUnlimited(distance) ? undefined : distance
    }
    // drop everything that is not truthy
    Object.entries(rest).forEach(([key, value]) => {
        if (!isEmpty(value)) {
            res[key as keyof URLSearchFormState] = value;
        }
    })*/
    const mappedLoc = extractLocation(location);
    return {
        ...rest,
        ...mappedLoc,
        pet: idToSlug(species),
        distance: isUnlimited(distance) ? undefined : distance
    };
}

const mapToForm = (state: URLSearchFormState): Partial<SearchFormState> => {
    const {zip, lat, lon, pet, ...rest} = state;
    const loc = {zip, lon, lat};
    const species = slugToId(pet);
    return {
        ...rest,
        species: isDogOrCat(species) ? species : undefined,
        location: hasLocation(loc) ? loc : undefined,
    }
}

export const searchToState = (search: string): Partial<SearchFormState> => {
    const object = qs.parse(search, { ignoreQueryPrefix: true }); //comma: true
    console.log(object, mapToForm(object));
    return mapToForm(object);
}

export const stateToSearch = (state: Partial<SearchFormState>): string => {
    return qs.stringify(mapToUrl(state), { skipNulls: true }); //arrayFormat: 'comma'
}


export const useSearchParams = (): Partial<SearchFormState> => {
    const {search} = useLocation();

    return useMemo( () => {
        return searchToState(search);
    }, [search]);
}
