import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { SearchFormState } from "../../components/search-box/types";
import { isValidZip } from "../location/formatting/validation";
import { receiveZip } from "../location/redux/actions";
import { searchToState } from "./useSearchParams";

/**
 * When going from the home page to the search page, get the species and zip code from the URL.
 *
 * Also push the zip code to redux.
 */

export const usePetZipQueryParams = (): Partial<SearchFormState> => {
  const location = useLocation<Partial<SearchFormState>>();
  const dispatch = useDispatch();

  /**
   * only run once -- don't need to respond to changes
   */
  return useMemo(
    () => {
      const values = searchToState(location.search);

      const zip = values.location?.zip;

      if (!!zip && isValidZip(zip)) {
        dispatch(receiveZip(zip, "url"));
      }

      return {
        ...location.state,
        ...values,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );
};
