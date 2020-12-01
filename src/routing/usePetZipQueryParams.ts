import {useLocation} from "react-router-dom";
import {idToSlug, MaybeDogOrCat, slugToId} from "../strings/species";
import {isValidZip} from "../search-box/location/ZipCodeInput";
import {useDispatch} from "react-redux";
import {locationSlice} from "../redux/location";
import {SearchFormState} from "../search-box/types";
import {getZip} from "../search-results/SearchPage";
import {useMemo} from "react";

/**
 * when going from the home page to the search page, get the species and zip code from the URL
 *
 * also push zip to redux
 */

export const usePetZipQueryParams = (): Partial<SearchFormState> => {
    const location = useLocation<Partial<SearchFormState>>();
    const dispatch = useDispatch();

    /**
     * only run once -- don't need to respond to changes
     */
    return useMemo( () => {
        const values = searchToState(location.search);

        const zip = getZip(values.location);

        if (!!zip && isValidZip(zip)) {
            dispatch(locationSlice.actions.enterZip(zip));
        }

        return {
            ...location.state,
            ...values
        };

    }, []);
}

export interface CreateProps {
    species?: MaybeDogOrCat;
    zip?: string;
}

/**
 * turn props species and zip into a state
 */
export const createState = ({species, zip}: CreateProps): Partial<SearchFormState> => {
    const values: Partial<SearchFormState> = {};
    values.species = slugToId(species);
    if (!!zip && isValidZip(zip)) {
        values.location = {
            postalcode: zip
        };
    }
    return values;
}

export const searchToState = (search: string): Partial<SearchFormState> => {
    const params = new URLSearchParams(search);
    const values: Partial<SearchFormState> = {};
    const pet = params.get('pet');

    values.species = slugToId(pet);
    const zip = params.get('zip');
    if (!!zip && isValidZip(zip)) {
        values.location = {
            postalcode: zip
        };
    }
    return values;
}

export const stateToSearch = (state: Partial<SearchFormState> = {}): string => {
    const params = new URLSearchParams();
    const slug = idToSlug(state.species);
    if (slug) {
        params.set('pet', slug);
    }
    const zip = getZip(state.location);
    if (zip) {
        params.set('zip', zip);
    }
    const search = params.toString();
    return search.length ? '?' + search : '';
}
