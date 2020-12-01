import {SearchFormState} from "../search-box/types";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {receiveCollection} from "../redux/collections";
import {client} from "../client";
import {createKey} from "../client/SearchRequest";
import {useCollectionsSelector} from "../redux/store";
import {FetchHook, useGenericFetch} from "./useRequireEntity";
import {idsFromCollection, isLoadedAll, isLoadedPage, nextPageNumber} from "../redux/collection-util";

export interface SearchReturns extends FetchHook {
    animalIds?: string[];
    total?: number;
    isLoadedAll: boolean;

    loadNext(): void;
}

export const useSearchResults = (args: Partial<SearchFormState>, enabled: boolean = true): SearchReturns => {

    const [page, setPage] = useState(1);

    /**
     * need to reset page to 1 whenever any args change
     */
    useEffect(() => {
        setPage(1);
    }, [args]);

    const dispatch = useDispatch();

    const key = useMemo(
        () => createKey(args),
        [args]
    );

    const collection = useCollectionsSelector(state => state[key]);

    const animalIds = idsFromCollection(collection);

    const total = collection?.meta.count;

    const shouldSearch = enabled && !isLoadedPage(collection, page);


    console.log({key,collection, shouldSearch});

    const execute = useCallback(
        async () => {
            const response = await client.search(args, page);
            dispatch(receiveCollection({
                type: 'animals',
                key,
                response
            }));
        },
        [key, args, page, dispatch]
    )

    const hook = useGenericFetch(execute);
    const  {load} = hook;

    useEffect(() => {
        if ( shouldSearch ) {
            load();
        }
    }, [load, shouldSearch]);

    /**
     * loadNext needs to be based on the total number loaded because the `animalIds` might include more than just page
     * 1 even if page variable here is 1
     */
    const loadNext = () => setPage(nextPageNumber(collection));

    return {
        ...hook,
        animalIds,
        total,
        isLoadedAll: isLoadedAll(collection),
        loadNext,
    }
}
