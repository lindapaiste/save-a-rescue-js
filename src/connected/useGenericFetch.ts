import {useCallback, useState} from "react";
import {FetchHook} from "./useRequireEntity";

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
