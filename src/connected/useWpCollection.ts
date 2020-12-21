import {WpEntityType} from "../clientWp/objects";
import {useCallback, useState} from "react";
import {useGenericFetch} from "./useGenericFetch";
import {FetchHook} from "./useRequireEntity";
import {WpResponseObject} from "../clientWp/response";
import {WpClient} from "../clientWp/WpClient";

const client = new WpClient();

/**
 * TODO: connect to redux
 */
export const useWpCollection = <T extends WpEntityType>(type: T, params: Record<string, any>): FetchHook & { objects?: WpResponseObject<T>[] } => {

    const [response, setResponse] = useState<WpResponseObject<T>[]>();

    const execute = useCallback(async () => {
        const res = await client.getCollection(type, {params});
        setResponse(res.entities);
    }, [type, params]);
    // ^ is dangerous to memoize on params because a new object might be created with the same params

    const hook = useGenericFetch(execute);

    return {
        ...hook,
        objects: response,
    };
}
