import {SearchFormState} from "../search-box/types";
import React, {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {searchAdoptables} from "./paths";
import {stateToSearch} from "./useSearchParams";

export const SearchLink = ({children, ...props}: PropsWithChildren<Partial<SearchFormState>>) => {
    return (
        <Link
            to={{
                pathname: searchAdoptables(),
                search: stateToSearch(props), //search.length ? '?' + search : '',
            }}
        >
            {children}
        </Link>
    )
}
