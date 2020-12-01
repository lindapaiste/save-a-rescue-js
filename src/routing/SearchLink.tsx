import {idToSlug, MaybeDogOrCat} from "../strings/species";
import {SearchFormState} from "../search-box/types";
import React, {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {searchAdoptables} from "./paths";
import {getZip} from "../search-results/SearchPage";

export interface Props {
    species?: MaybeDogOrCat;
    zip?: string;
    state?: Partial<SearchFormState>;
}

export const SearchLink = ({state, children, ...props}: PropsWithChildren<Props>) => {
    const params = new URLSearchParams();
    const species = props.species || state?.species;
    const slug = idToSlug(species);
    if (slug) {
        params.set('pet', slug);
    }
    const zip = props.zip || getZip(state?.location);
    if (zip) {
        params.set('zip', zip);
    }
    const search = params.toString();

    return (
        <Link
            to={{
                pathname: searchAdoptables(),
                search: search.length ? '?' + search : '',
                state
            }}
        >
            {children}
        </Link>
    )
}
