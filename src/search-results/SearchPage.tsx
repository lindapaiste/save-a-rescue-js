import {SearchFormState} from "../search-box/types";
import React, {useState} from "react";
import {SearchHeader} from "../search-box/SearchHeader";
import {RenderSearchResults} from "./SearchResults";
import {EITHER_VAL} from "../strings/species";
import {stateToSearch, usePetZipQueryParams} from "../routing/usePetZipQueryParams";
import {useSeoTitle} from "./useSeoTitle";
import {FilterLocation} from "../client/request";
import {useSearchResults} from "../connected/useSearchResults";
import {useHistory, useLocation} from "react-router-dom";

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


export const SearchPage = ({initialValues}: {initialValues: SearchFormState}) => {
    const [formVal, setFormVal] = useState<SearchFormState>(initialValues);

    const results = useSearchResults(formVal, !!formVal.location);

    /**
     * sync form state to URL
     */
    const history = useHistory();
    const location = useLocation();

    const onValuesChange = (changedValues: Partial<SearchFormState>, values: SearchFormState) => {

        console.log({changedValues, values});

        setFormVal(values);

        history.replace({
            ...location,
            search: stateToSearch(values),
            state: values,
        });
    }

    useSeoTitle({
        species: formVal.species,
        zip: getZip(formVal.location)
    })

    return (
        <div className="search-page">
            <SearchHeader
                initialValues={initialValues}
                onValuesChange={onValuesChange}
            />
            <RenderSearchResults
                {...results}
                previous={{
                    type: 'search',
                    state: formVal,
                }}
            />
        </div>
    )
}

export const getZip = (location?: FilterLocation): string | undefined => {
    if (location && 'postalcode' in location) {
        return location.postalcode.toString();
    }
}
