import {AllLinks} from "./Links";
import {Unpack} from "./RestObject";
import {WpAuthorJson} from "./each/AuthorSchema";
import {WpTermEmbedded} from "./each/TermSchema";
import {WpMediaEmbedded} from "./each/MediaSchema";
import {WpCommentEmbedded} from "./each/CommentSchema";

/**
 * some embeds have _links, but just ignore that
 */

/**
 * if it's an embeddable link, can show up in embedded
 */
export interface _Embedded { //extends Record<EmbeddableKeys, any>
    author: WpAuthorJson[], //is in fact the full version
    'wp:term': WpTermEmbedded[][], //terms are an array of arrays
    'wp:featuredmedia': WpMediaEmbedded[],
    replies: WpCommentEmbedded[],
    'in-reply-to': WpCommentEmbedded[],
    //todo: deal with 'up' - can be post or comment
}

export type AnyEmbeddedJson = Unpack<Unpack<_Embedded[keyof _Embedded]>>

export type EmbeddedFromLinks<Links extends Partial<AllLinks>> = Required<Extract<_Embedded, keyof Links>>

//export type WithEmbedded<T> = T extends {_links?: (infer U)[]} ? T &  {_embedded?: }
