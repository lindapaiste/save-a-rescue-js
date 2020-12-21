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
export const useWpEntity = <T extends WpEntityType>(type: T, id: string | number = ""): FetchHook & { object?: WpResponseObject<T> } => {

    const [response, setResponse] = useState<WpResponseObject<T>>();

    const execute = useCallback(async () => {
        const res = await client.getEntity(type, id, {
            params: {
                _embed: 1,
            }
        });
        setResponse(res.entities[0]);
    }, [type, id]);

    const hook = useGenericFetch(execute);

    return {
        ...hook,
        object: response,
    };
}
