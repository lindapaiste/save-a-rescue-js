/**
 * use this function in the browser to get the type of a response:
 *
 * flat:
 * Object.keys(json[0]).map( k => k + ': ' + typeof(json[0][k]) + ',\n' ).join('');
 *
 * nested:
 * let printObjectSchema = (obj) => ( Array.isArray(obj) ? '[' : '{') + '\n' + Object.keys(obj).map( k =>  (
 * Array.isArray(obj) ? '' : k + ': ') + (typeof(obj[k]) === 'object' ? printObjectSchema(obj[k]): typeof(obj[k])) +
 * ',\n' ).join('') + ( Array.isArray(obj) ? ']' : '}') + '\n'; printObjectSchema(json[0])
 */

export interface Link {
    href: string,
}

interface Curie extends Link {
    name: string,
    templated: boolean,
}

export interface EmbeddableLink extends Link {
    embeddable: boolean,
}

export interface PostLink extends EmbeddableLink {
    post_type: string,
}

export interface TermLink extends EmbeddableLink {
    taxonomy: string,
}

interface VersionHistoryLink extends Link {
    count: number,
}

interface PredecessorVersionLink extends Link {
    id: number,
}

/**
 * base _links object with all possible properties
 *
 * for each implementation, use Pick to create the subset
 */
export interface AllLinks {
    collection: Link[],
    curies: Curie[],
    self: Link[],
    'wp:items': Link[],
    'wp:post_type': Link[],
    'wp:featuredmedia': EmbeddableLink[],
    'wp:attachment': Link[],
    'wp:term': TermLink[],
    about: Link[],
    author: EmbeddableLink[],
    replies: EmbeddableLink[],
    'version-history': VersionHistoryLink[],
    'predecessor-version': PredecessorVersionLink[],
    up: EmbeddableLink[], //link to parent on hierarchical term //TODO: also link to parent on comment but it looks
                           // different b/c has post_type
}

export type EmbeddableKeys<T extends Partial<AllLinks>> = {
    [K in keyof T]: T[K] extends EmbeddableLink[] ? K : never;
}[keyof T]

export type AllEmbeddableKeys = EmbeddableKeys<AllLinks>

export type LinkKey = keyof AllLinks;

export type Links<T extends keyof AllLinks> = Pick<AllLinks, T>;
