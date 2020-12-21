import {useLocation} from "react-router-dom";
import {idToSlug, MaybeDogOrCat, slugToId} from "../strings/species";
import {useDispatch} from "react-redux";
import {locationSlice} from "../redux/location";
import {SearchFormState} from "../search-box/types";
import {useMemo} from "react";
import {isValidZip} from "../location/validation";

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
    return useMemo(() => {
        const values = searchToState_(location.search);

        const zip = values.location?.zip;

        if (!!zip && isValidZip(zip)) {
            dispatch(locationSlice.actions.enterZip({
                zip,
                source: 'url',
                timestamp: Date.now(),
            }));
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
            zip
        };
    }
    return values;
}

export const searchToState_ = (search: string): Partial<SearchFormState> => {
    const params = new URLSearchParams(search);
    const values: Partial<SearchFormState> = {};
    const pet = params.get('pet');

    values.species = slugToId(pet);
    const zip = params.get('zip');
    if (!!zip && isValidZip(zip)) {
        values.location = {
            zip
        };
    }

    return values;
}

export const stateToSearch_ = (state: Partial<SearchFormState> = {}): string => {
    const params = new URLSearchParams();
    const slug = idToSlug(state.species);
    if (slug) {
        params.set('pet', slug);
    }
    const zip = state.location?.zip;
    if (zip) {
        params.set('zip', zip);
    }
    const search = params.toString();
    return search.length ? '?' + search : '';
}
