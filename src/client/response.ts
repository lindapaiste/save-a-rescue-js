import {EntityAttributes} from "./attributes";

export interface ResponseMeta {
    /**
     * The total number of entities that matched query. This value can be used to control the paging of entities in
     * your client application.
     */
    count: number;
    /**
     * The number of entities included in the response.
     */
    countReturned: number;
    /**
     * The page number of the results that were provided in the response.
     */
    pageReturned: number;
    /**
     * The results limit that was used for your request.
     */
    limit: number;
    /**
     * The total number of pages using the current limit.
     */
    pages: number;
    /**
     * The identifier for your request. Provide this information if you request help from RescueGroups.org for this
     * specific request.
     */
    transactionId: string;
}

/**
 * Keyed[K] is just the attributes.  Response object contains attributes as a property plus id, type, and relationships
 */
export interface ResponseObject<K extends keyof EntityAttributes> {
    type: K;
    id: string;
    attributes: EntityAttributes[K];
    relationships?: Relationships;
}

/**
 * included objects can be any type, but want to maintain relationship between type and attributes
 */

type KeyedResponseObjects = {
    [K in keyof EntityAttributes]: ResponseObject<K>
}
type Included = KeyedResponseObjects[keyof EntityAttributes]
/**
 * Each field (ie. "breed") contains a property "data" with an array of type/id objects.
 * The type of the object should always match the key of the field.
 */
export type Relationships = {
    [K in keyof EntityAttributes]?: {
        data: {
            type: K;
            id: string;
        }[];
    }
}

export interface ResponseBody<K extends keyof EntityAttributes> {
    meta: ResponseMeta;
    data: Record<number, ResponseObject<K>>
    included: Included[];
}

export interface RgError {
    detail: string;
    status: number;
    title: string;
}

export interface ErrorResponseBody {
    errors: RgError[];
    meta: Pick<ResponseMeta, 'transactionId'>
}
