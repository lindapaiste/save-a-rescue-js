import {RgEntityAttributes, RgEntityType} from "./attributes";

export interface RgResponseMeta {
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
export interface RgResponseObject<K extends keyof RgEntityAttributes> {
    type: K;
    id: string;
    attributes: RgEntityAttributes[K];
    relationships?: RgRelationships;
}

/**
 * included objects can be any type, but want to maintain relationship between type and attributes
 */

type RgKeyedResponseObjects = {
    [K in RgEntityType]: RgResponseObject<K>
}
type RgIncluded = RgKeyedResponseObjects[RgEntityType]
/**
 * Each field (ie. "breed") contains a property "data" with an array of type/id objects.
 * The type of the object should always match the key of the field.
 */
export type RgRelationships = {
    [K in RgEntityType]?: {
        data: {
            type: K;
            id: string;
        }[];
    }
}

export interface RgResponseBody<K extends RgEntityType> {
    meta: RgResponseMeta;
    data: Record<number, RgResponseObject<K>>
    included: RgIncluded[];
}

export interface RgError {
    detail: string;
    status: number;
    title: string;
}

export interface RgErrorResponseBody {
    errors: RgError[];
    meta: Pick<RgResponseMeta, 'transactionId'>
}
