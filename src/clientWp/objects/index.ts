import {WpAuthorJson} from "./each/AuthorSchema";
import {WpCommentEmbedded, WpCommentJson} from "./each/CommentSchema";
import {WpMediaEmbedded, WpMediaJson} from "./each/MediaSchema";
import {WpPostJson, WpPostEmbedded} from "./each/PostSchema";
import {WpPostTypeJson} from "./each/PostTypeSchema";
import {WpTaxonomyJson} from "./each/TaxonomySchema";
import {WpTermEmbedded, WpTermJson} from "./each/TermSchema";
import {SpWpCarouselJson} from "./each/SpWpCarouselSchema";

/**
 * purpose here is to associate key name with object type
 * key name should match endpoint slug
 */
export interface WpEntityAttributes {
    users: {
        root: WpAuthorJson;
        embedded: WpAuthorJson;
    },
    comments: {
        root: WpCommentJson;
        embedded: WpCommentEmbedded;
    },
    media: {
        root: WpMediaJson;
        embedded: WpMediaEmbedded;
    },
    posts: {
        root: WpPostJson;
        embedded: WpPostEmbedded;
    },
    types: {
        root: WpPostTypeJson;
        embedded: never;
    };
    taxonomies: {
        root: WpTaxonomyJson;
        embedded: never;
    },
    categories: {
        root: WpTermJson;
        embedded: WpTermEmbedded;
    },
    tags: {
        root: WpTermJson;
        embedded: WpTermEmbedded;
    },
    sp_wp_carousel: {
        root: SpWpCarouselJson;
        embedded: WpPostEmbedded;
    };
}

export type WpEntityType = keyof WpEntityAttributes;

export type WpRootAttributes<T extends WpEntityType = WpEntityType> =
    WpEntityAttributes[T]['root'];

export type WpEmbeddedAttributes<T extends WpEntityType = WpEntityType> =
    WpEntityAttributes[T]['embedded'];

// need to know that embedded is always a subset of root -- is that true?
export type WpEitherAttributes<T extends WpEntityType = WpEntityType> =
    WpEntityAttributes[T]['embedded'] | (WpEntityAttributes[T]['root'] & Partial<WpRootAttributes<T>>);

export interface WpEntityIdentifier<T extends WpEntityType = WpEntityType> {
    type: T;
    id: string;
}

