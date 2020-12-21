export type TaxPTShared = {
    name: string;
    slug: string;
    id?: never;
    description: string;
    hierarchical: boolean;
    rest_base: string;
}

export interface WpTaxonomyJson extends TaxPTShared {
    types: string[];
}
