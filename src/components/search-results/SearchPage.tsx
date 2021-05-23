import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SearchFormState } from "../search-box/types";
import { SearchHeader } from "../search-box/SearchHeader";
import { RenderSearchResults } from "./SearchResults";
import { EITHER_VAL } from "../../services/species/species";
import { usePetZipQueryParams } from "../../services/routing/usePetZipQueryParams";
import { useSearchResults } from "../../services/search/useSearchResults";
import { useSearchSeoTitle } from "../../services/seo/useSearchSeoTitle";
import {
  stateToSearch,
  useSearchParams,
} from "../../services/routing/useSearchParams";
import { ResultsFormat } from "./FormatSwitch";
import { Placement } from "../pet-card/types";
import { didSearch } from "../../services/recently-viewed/recent";
import { useDispatch } from "../../services/store";

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
};

/**
 * Handling breed clearing when changing species is tricky due to the internal state of the form.
 * Instead of clearing, store both dog and cat breeds separately.  Only show one Select.  Only include one in key and
 * in request. Now the breed is preserved if going from dog to cat and back.
 */

export const SearchPage = ({
  initialValues,
  initialFormat = "card",
}: {
  initialValues: SearchFormState;
  initialFormat?: ResultsFormat;
}) => {
  const formVal = useSearchParams();

  const results = useSearchResults(formVal, !!formVal.location);

  /**
   * sync form state to URL
   */
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(didSearch(location));
  }, [dispatch, location]);

  const onValuesChange = (
    changedValues: Partial<SearchFormState>,
    values: SearchFormState
  ) => {
    history.replace(
      {
        ...location,
        search: stateToSearch(values),
      },
      values
    );
  };

  useSearchSeoTitle(formVal);

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
  );
};

/**
 * breaking up into two components so that the url only gets evaluated once
 */
export default function SearchRoute() {
  const urlValues = usePetZipQueryParams();

  const initialValues = {
    ...defaultValues,
    ...urlValues,
  };

  return <SearchPage initialValues={initialValues} />;
}
