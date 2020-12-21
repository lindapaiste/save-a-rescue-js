import {_Embedded} from "./Embedded";
import {AllLinks} from "./Links";

export type Unpack<A> = A extends (infer T)[] ? T : never;

export type integer = number;
export type float = number;
export type dateTime = string;

/**
 * pass links as a prop to the generic type in order to automatically populate _embedded
 *
 * id can be undefined, but it cannot be any type other than number
 */
export interface RestJsonGeneric {
    _links?: Partial<AllLinks>,
    _embedded?: Partial<_Embedded>,
    id?: number,
}

/**
 * if an object has an "id" property then it is always a number
 * I am using "slug", which is a string, as the equivalent to id for taxonomies
 * but technically they do not have an "id" field
 */
export interface RestJsonObject extends RestJsonGeneric {
    id: number,
}

export interface TextRendered {
    rendered: string,
    raw?: string,
    protected?: boolean,
}

/**
 * union of all possible entities
 */
//export type RestJson = RestAuthor | RestComment | RestLink | RestMedia | RestPost | RestPostType | RestProduct |
// RestRetailer | RestTaxonomy | RestTerm | RestVariant;
