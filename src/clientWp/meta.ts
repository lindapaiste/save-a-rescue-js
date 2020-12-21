// ----------------------------------- TYPES ------------------------------------//

/**
 * for maximum flexibility, map constants to HTTP methods rather than using HTTP methods as plain strings
 */

export enum Crud {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
}

/**
 * meta properties which are stored in state
 */
export interface FetchMeta {
    isFetching: false | Crud;
    receivedAt: number | null; //timestamp of the last successful fetch, or null if not fetched
    didInvalidate: boolean;
    errors: any[];
}

/**
 * meta properties which are derived from a combination of stored FetchMeta properties
 */
export interface ComputedMeta {
    isError: boolean;
    isReady: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    isSaving?: boolean;
    isDeleting?: boolean;
    shouldFetch: boolean;
}

/**
 * generic type combines computed properties with initial type
 */
export type WithComputed<T extends FetchMeta = FetchMeta> = T & ComputedMeta

// --------------------------------- DEFAULTS ----------------------------------//

export const initialMeta: FetchMeta = {
    isFetching: false,
    receivedAt: null,
    didInvalidate: false,
    errors: [],
}

// --------------------------------- DERIVED -----------------------------------//

/**
 * now strictly typed, so no longer allowing meta to be undefined
 * expect to pass a defaultMeta if not found
 * also not exporting individual functions
 */

/**
 * get all derived properties for a meta object
 */
export const computeMeta = ({isFetching, errors, didInvalidate, receivedAt}: FetchMeta): ComputedMeta => {
    /**
     * isError if there are any errors
     */
    const isError = errors.length > 0;

    /**
     * isLoading as of now is just an alias for isFetching
     */
    const isLoading = !! isFetching;

    /**
     * maybe separate out for collections since not applicable?
     */
    const isSaving = isFetching === Crud.UPDATE;
    const isDeleting = isFetching === Crud.DELETE;

    /**
     * isLoaded if a fetch has been completed successfully, even if invalidated
     */
    const isLoaded = !! receivedAt && ! isError && ! isFetching;

    /**
     * isReady if the content isLoaded and has not been invalidated
     */
    const isReady = isLoaded && ! didInvalidate;

    /**
     * should fetch if the data is not ready and hasn't already begun fetching
     */
    const shouldFetch = ! isReady && ! isLoaded;

    return {
        isError,
        isLoaded,
        isLoading,
        isReady,
        shouldFetch,
        isSaving,
        isDeleting,
    }
}

/**
 * add additional values to selectors without storing them in state
 */
export const makeMetaComplete = <T extends FetchMeta>(meta: T): WithComputed<T> => {
    return {
        ...meta,
        ...computeMeta(meta),
    }
};

// --------------------------------- OPERATIONS -----------------------------------//

/**
 * utility functions update a meta object
 * so that entities meta and collections meta don't need to repeat each other
 */

export const invalidate = <T extends FetchMeta>(meta: T): WithComputed<T> => makeMetaComplete({
    ...meta,
    didInvalidate: true
});

export const beginRequest = <T extends FetchMeta>(meta: T, method: Crud): WithComputed<T> => makeMetaComplete({
    ...meta,
    isFetching: method,
});

export const receiveSuccess = <T extends FetchMeta>(meta: T, receivedAt: number): WithComputed<T> => makeMetaComplete({
    ...meta,
    receivedAt, // store the timestamp
    isFetching: false, // stop the fetch
    didInvalidate: false, // clear previous invalidations on success
    errors: [] // clear previous errors on success
});

export const receiveError = <T extends FetchMeta>(meta: T, error: any): WithComputed<T> => makeMetaComplete({
    ...meta,
    isFetching: false, // stop the fetch
    errors: [...meta.errors, error] // store the error
});
