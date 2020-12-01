import {actions, useEntitiesSelector} from "../redux/store";
import {shouldFetchEntity} from "../redux/selectors";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {client} from "../client";
import {EntityIdentifier, EntityType} from "../client/attributes";
import {PartialSome} from "@lindapaiste/ts-helpers";

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
export const useRequireEntity = <T extends EntityType>({type, id = ""}: PartialSome<EntityIdentifier<T>, 'id'>): FetchHook => {
    const shouldFetch = useEntitiesSelector(shouldFetchEntity({type, id})) && !!id;

    const hook = useFetchFunction({type, id});
    console.log(hook);
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
export const useFetchFunction = <T extends EntityType>({id, type}: EntityIdentifier<T>): FetchHook => {

    const dispatch = useDispatch();

    const execute = useCallback(
        async () => {
            const response = await client.getEntity<T>(type, id);
            dispatch(actions.receiveCollection({
                response,
                key: 'X',
                type,
            }));
        }, [type, id, dispatch]);

    return useGenericFetch(execute);
}


/**
 * execute is a function which takes not props. is expected to be memoized.  is expected to throw errors.
 */
export const useGenericFetch = (execute: () => void): FetchHook => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false); //putting this separate because error is any so technically it could
                                                   // be undefined
    const [error, setError] = useState<any>();

    const load = useCallback(
        async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                await execute();
                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsError(true);
                setIsLoading(false);
            }
        },
        [execute]);

    return {
        isLoading,
        isError,
        error,
        load
    }
}


export const useAutoFetchEntity = (entity: EntityIdentifier) => {
    const {load} = useFetchFunction(entity);

    useEffect(() => {
        load();
    }, [load]);
}

export const useRequireAnimal = (id: string) => useRequireEntity({id, type: 'animals'});
export const useRequireOrg = (id: string) => useRequireEntity({id, type: 'orgs'});
