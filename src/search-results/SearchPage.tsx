import {SearchFormState} from "../search-box/types";
import React, {useEffect} from "react";
import {SearchHeader} from "../search-box/SearchHeader";
import {RenderSearchResults} from "./SearchResults";
import {EITHER_VAL} from "../strings/species";
import {usePetZipQueryParams} from "../routing/usePetZipQueryParams";
import {useSearchResults} from "../connected/useSearchResults";
import {useHistory, useLocation} from "react-router-dom";
import {useSearchSeoTitle} from "../seo/useSearchSeoTitle";
import {stateToSearch, useSearchParams} from "../routing/useSearchParams";
import {useCanonical} from "../seo/useCanonical";
import {useDispatch} from "react-redux";
import {nestedActions} from "../redux/store";
import {ResultsFormat} from "./FormatSwitch";
import {Placement} from "../pet-card/types";

// TODO: access values via url navigation

/**
 * use initial state when navigating from links
 */
export interface Props {
    initialState?: Partial<SearchFormState>;
}

const defaultValues: SearchFormState = {
    species: EITHER_VAL,
    sex: [],
    breedCats: [],
    breedDogs: [],
    sizes: [],
    ages: [],
}

/**
 * Handling breed clearing when changing species is tricky due to the internal state of the form.
 * Instead of clearing, store both dog and cat breeds separately.  Only show one Select.  Only include one in key and
 * in request. Now the breed is preserved if going from dog to cat and back.
 */

/**
 * breaking up into two components so that the url only gets evaluated once
 */
export const SearchRoute = () => {

    const urlValues = usePetZipQueryParams();

    const initialValues = {
        ...defaultValues,
        ...urlValues
    };

    return (
        <SearchPage
            initialValues={initialValues}
        />
    )
}


export const SearchPage = ({initialValues, initialFormat = "card"}: { initialValues: SearchFormState, initialFormat?: ResultsFormat }) => {
    //const [formVal, setFormVal] = useState<SearchFormState>(initialValues);

    const formVal = useSearchParams();


    const results = useSearchResults(formVal, !!formVal.location);

    /**
     * sync form state to URL
     */
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        console.debug("location changed");
        dispatch(nestedActions.lastSearch.didSearch(location));
    }, [dispatch, location]);

    const onValuesChange = (changedValues: Partial<SearchFormState>, values: SearchFormState) => {

        history.replace({
            ...location,
            search: stateToSearch(values),
            state: values,
        });

    }

    useSearchSeoTitle({
        species: formVal.species,
        zip: formVal.location?.zip,
    })

    useCanonical();

    return (
        <div className="search-page">
            <SearchHeader
                initialValues={initialValues}
                onValuesChange={onValuesChange}
            />
            <RenderSearchResults
                {...results}
                species={formVal.species}
                initialFormat={initialFormat}
                placement={Placement.SEARCH_ADOPTABLE}
            />
        </div>
    )
}
