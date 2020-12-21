import {SearchFormState} from "../search-box/types";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {receiveCollection} from "../redux/rgCollections";
import {client} from "../clientRg";
import {useCollectionsSelector} from "../redux/store";
import {FetchHook} from "./useRequireEntity";
import {idsFromCollection, isLoadedAll, isLoadedPage, nextPageNumber} from "../redux/collection-util";
import {useGenericFetch} from "./useGenericFetch";

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

    const request = useMemo(
        () => client.createSearchRequest(args, page),
        [args, page]
    );

    const collection = useCollectionsSelector(state => state[request.key]);

    const animalIds = idsFromCollection(collection);

    const total = collection?.meta.count;

    const shouldSearch = enabled && !isLoadedPage(collection, page);


    //console.log({key: request.key,collection, shouldSearch});

    const execute = useCallback(
        async () => {
            const response = await request.execute();
            dispatch(receiveCollection({
                type: 'animals',
                key: request.key,
                response
            }));
        },
        [request, dispatch]
    )

    const hook = useGenericFetch(execute);
    const {load} = hook;

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
        ...hook,
        animalIds,
        total,
        isLoadedAll: isLoadedAll(collection),
        loadNext,
    }
}
