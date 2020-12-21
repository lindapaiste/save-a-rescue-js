import {RgEntityType} from "./attributes";

export interface RgRequestParams {
    /**
     * The page of results to return (starting with 1).
     */
    page?: number;
    /**
     * The number of data objects to return in the results. The maximum limit for most endpoints is 250, except for
     * static data with limited records, like breeds, colors, patterns, which have no maximum limit. Zero (0) can be
     * used if you want meta data only, and no records to be returned. A value that is non-numeric, negative, or higher
     * than the max limit for the endpoint will result in a 400 error response.
     */
    limit?: number;

    /**
     * A comma separated list of fields to sort the result objects. You can provide multiple sort attributes, each with
     * either ascending (+) or descending (-). Ascending (+) is assumed if the order is not provided, and you must
     * encode + as %2B. It may be easier to leave off the + for ascending sort. Each sort value must be the full field
     * name, like -animals.name. Also available on some endpoints is random sorting. The endpoint will note if it
     * supports random sorting.
     */
    sort?: string;

    /**
     * A comma separated list of fields to provide in the response. If fields[] is not provided, the default fields
     * will be returned. Multiple fields[] parameters can be provided like this:
     * fields[animals]=name,fields[fosters]=email You can find the valid fields in the Schema for each endpoint.
     */
    fields?: { key: string, value: string }[];

    /**
     * A comma separated list of includes to provide in the response. If include[] is not provided, the default
     * includes will be returned. You can find the valid include values in the endpoint reference.
     */
    include?: RgEntityType[];
}

export type Operation =
    'equal'
    | 'notequal'
    | 'lessthan'
    | 'lessthanorequal'
    | 'greaterthan'
    | 'greaterthanorequal'
    | 'contains'
    | 'notcontains'
    | 'blank'
    | 'notblank'

export interface AttributeFilter {
    /**
     * Not an enum due to nesting.  Can be "statuses.name", "species.singular", etc.
     * In client, can make this two properties in order to enforce stricter typing
     */
    fieldName: string;
    operation: Operation;
    criteria: string | string[];
}

/**
 * Distance radius searches are available on specific endpoints. They can accomplished by providing a filterRadius
 * object in the POST data. The distance can be miles or kilometers. The results meta will automatically include
 * distance attribute which is the distance from the provided postal code in the same units as your request (miles or
 * kilometers).
 *
 * In order to make a valid geodistance search you must provide both a location, and distance. Location can be provided
 * as lat and lon, coordinates (lat,lon), or postalcode. Distance can be provided as either miles or kilometers.
 */
export type LocationFilter = FilterLocation & FilterDistance;

type FilterDistance = {
    miles: number;
} | {
    kilometers: number;
}

export type FilterLocation = {
    /**
     * lat and lon as separate values in the data
     */
    lat: number;
    lon: number;
} | {
    /**
     * Latitude and longitude together as comma separated (lat,lon)
     */
    coordinates: string;
} |  {
    /**
     * A valid US or Canadian postal code (called zip code in the US). We will convert the postal code into latitude
     * and longitude, using the "center", which is not as accurate as the two alternative methods above.
     */
    postalcode: string | number;
}

export interface RgRequestData {
    filters?: AttributeFilter[];
    filterProcessing?: string;
    filterRadius?: LocationFilter;
}

export type RequestBody = undefined | {data: RgRequestData}
