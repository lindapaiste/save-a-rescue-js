import {flatActions, useEntitiesSelector} from "../redux/store";
import {shouldFetchEntity} from "../redux/rgSelectors";
import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {client} from "../clientRg";
import {RgEntityIdentifier, RgEntityType} from "../clientRg/attributes";
import {PartialSome} from "@lindapaiste/ts-helpers";
import {useGenericFetch} from "./useGenericFetch";

export interface FetchHook {
    isLoading: boolean;
    isError: boolean;
    error: any;

    load(): void;
}

/**
 * all functions should gracefully handle empty id by NOT FETCHING
 */

/**
 * only fetches conditionally based on redux state
 * allow for id to be undefined to handle conditional loading of relationship entities
 * returns the load function rto be used as "retry" on errors
 */
export const useRequireEntity = <T extends RgEntityType>({type, id = ""}: PartialSome<RgEntityIdentifier<T>, 'id'>): FetchHook => {
    const shouldFetch = useEntitiesSelector(shouldFetchEntity({type, id})) && !!id;

    const hook = useFetchFunction({type, id});
    //console.log(hook);
    const {load} = hook;

    useEffect(() => {
        if (shouldFetch) {
            load();
        }
    }, [load, shouldFetch]);

    return hook;
}

/**
 * returns a function to the execute the fetch, and an isLoading boolean
 */
export const useFetchFunction = <T extends RgEntityType>({id, type}: RgEntityIdentifier<T>): FetchHook => {

    const dispatch = useDispatch();

    const execute = useCallback(
        async () => {
            const response = await client.getEntity<T>(type, id);
            dispatch(flatActions.receiveCollection({
                response,
                key: 'X',
                type,
            }));
        }, [type, id, dispatch]);

    return useGenericFetch(execute);
}


export const useAutoFetchEntity = (entity: RgEntityIdentifier) => {
    const {load} = useFetchFunction(entity);

    useEffect(() => {
        load();
    }, [load]);
}

export const useRequireAnimal = (id: string) => useRequireEntity({id, type: 'animals'});
export const useRequireOrg = (id: string) => useRequireEntity({id, type: 'orgs'});
