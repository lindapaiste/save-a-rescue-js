import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { SearchFormState } from "../../../components/search-box/types";
import { stateToSearch } from "../useSearchParams";
import { PATHS } from "../paths";

/**
 * Handle the navigation to search results page.
 */
type Props = Omit<ComponentProps<Link>, "to"> & Partial<SearchFormState>;

export const SearchLink = ({ children, ...props }: Props) => {
  return (
    <Link
      to={{
        pathname: PATHS.search(),
        search: stateToSearch(props), // search.length ? '?' + search : '',
      }}
    >
      {children}
    </Link>
  );
};
