import {TaxPTShared} from "./TaxonomySchema";

/**
 * is basically the same as RestTaxonomy except for taxonomies/types field
 */

export interface WpPostTypeJson extends TaxPTShared {
    slug: string;
    taxonomies: string[];
}
