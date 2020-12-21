export interface WpTermJson {
    id: number,
    count: number,
    description: string,
    link: string,
    name: string,
    slug: string,
    taxonomy: string,
    parent?: number, //only on hierarchical
    meta: object, //meta shows up as an array when empty, but is a keyed object
}

export type WpTermEmbedded = Pick<WpTermJson, 'id' | 'link' | 'name' | 'slug' | 'taxonomy'>;
