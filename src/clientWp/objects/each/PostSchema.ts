import {dateTime, TextRendered} from "../RestObject";

/**
 * define separately the fields which are in both posts and media
 */
export interface WpPostMediaSharedFields {
    id: number;
    date: dateTime;
    date_gmt: dateTime;
    guid: TextRendered;
    modified: dateTime;
    modified_gmt: dateTime;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: TextRendered;
    author: number;
    comment_status: string;
    ping_status: string;
    template: string;
}

export type WpPostJson = WpPostMediaSharedFields & {
    content: TextRendered;
    excerpt: TextRendered;
    featured_media: number;
    meta: Record<string, any>; //TODO
    /**
     * taxonomies are stored as top level properties where the key is the rest base and the value is an array of
     * numbers.  could specific taxonomies for each post type; or could assume all optional and verify at run-time
     */
} & Partial<Record<string, number[]>>

// TODO: are taxonomies included here?
export type WpPostEmbedded = Pick<WpPostJson, 'id' | 'date' | 'slug' | 'type' | 'link' | 'title' | 'excerpt' | 'author' | 'featured_media' | '_links'>;
