
import {WpEntityType, WpRootAttributes} from "./objects";
import {AllLinks} from "./objects/Links";
import {_Embedded} from "./objects/Embedded";

/**
 * headers from wp response
 */
export interface WpResponseHeaders {
    'cache-control': string;
    'content-type': string;
    expires: string; // date time
    pragma: string;

    /**
     * note: keyed responses (types/taxonomies) do not have total or total pages.  types does have content-length but
     * taxonomies doesn't
     */
    'x-wp-total'?: number;
    'x-wp-totalpages'?: number;

    'content-length'?: string; //number as quoted string
}

export type WpResponseObject<T extends WpEntityType> =
    WpRootAttributes<T> & {
    _links?: Partial<AllLinks>;
    _embedded: Partial<_Embedded>;
}

export type WpCollectionResponseBody<T extends WpEntityType> =
    Record<string, WpResponseObject<T>> |
    WpResponseObject<T>[]

export type WpResponseBody<T extends WpEntityType> =
    WpCollectionResponseBody<T> | WpResponseObject<T>

export type WpResponseFormatted<T extends WpEntityType> = {
    entities: WpResponseObject<T>[];
    headers: WpResponseHeaders;
}
