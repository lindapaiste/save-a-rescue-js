import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { SearchFormState } from "../../components/search-box/types";
import { useSelector } from "../store";
import { FetchHook } from "../rescuegroups-api/entities/useRequireEntity";
import {
  isLoadedAll,
  isLoadedPage,
  nextPageNumber,
} from "../rescuegroups-api/collections/util";
import { SearchRequest } from "./SearchRequest";
import {
  selectCollectionByKey,
  selectStatusByKey,
} from "../rescuegroups-api/collections/selectors";
import { loadCollection } from "../rescuegroups-api/collections/load";
import { statusBooleans } from "../rescuegroups-api/collections/state";

export interface SearchReturns extends FetchHook {
  animalIds?: string[];
  total?: number;
  isLoadedAll: boolean;

  loadNext(): void;
}

export const useSearchResults = (
  args: Partial<SearchFormState>,
  enabled = true
): SearchReturns => {
  const [page, setPage] = useState(1);

  /**
   * need to reset page to 1 whenever any args change
   */
  useEffect(() => {
    setPage(1);
  }, [args]);

  const dispatch = useDispatch();

  const request = useMemo(() => new SearchRequest(args), [args]);

  const collection = useSelector(selectCollectionByKey(request.key));

  const { status, error } = useSelector(selectStatusByKey(request.key));

  const { isLoading, isError } = statusBooleans(status);

  const animalIds = useMemo(
    // IDEA: don't show more than the current requested page
    // even if more pages were loaded previously: .slice(0, page)
    () => (collection ? collection.ids.flat() : []),
    [collection]
  );

  const total = collection?.meta.count;

  const shouldSearch = enabled && !isLoadedPage(collection, page) && !isLoading;

  const load = useCallback(() => {
    dispatch(loadCollection(request.setPage(page).raw()));
  }, [dispatch, request, page]);

  useEffect(() => {
    if (shouldSearch) {
      load();
    }
  }, [load, shouldSearch]);

  /**
   * loadNext needs to be based on the total number loaded because the `animalIds` might include more than just page
   * 1 even if page variable here is 1
   */
  const loadNext = () => setPage(nextPageNumber(collection));

  return {
    error,
    isError,
    isLoading,
    load,
    animalIds,
    total,
    isLoadedAll: isLoadedAll(collection),
    loadNext,
  };
};
