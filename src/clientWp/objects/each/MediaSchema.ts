import {TextRendered} from "../RestObject";
import {WpPostMediaSharedFields} from "./PostSchema";

interface WpMediaOnlyFields {
    type: 'attachment';
    description: TextRendered;
    caption: TextRendered;
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: WpMediaDetails;
    post: number | null;
    source_url: string;
    meta?: Record<string, any>; // no meta yet
}

export type WpMediaJson = WpPostMediaSharedFields
    & WpMediaOnlyFields;

export type WpMediaEmbedded = Omit<WpMediaOnlyFields, 'meta' | 'description' | 'post'>
    & Pick<WpPostMediaSharedFields, 'id' | 'date' | 'slug' | 'type' | 'link' | 'title' | 'author'>

export interface WpMediaDetails {
    width: number;
    height: number;
    file: string;
    sizes: Partial<Record<string, WpImageSize>>;
    image_meta: WpImageFileMeta;
}

export interface WpImageSize {
    width: number;
    height: number;
    source_url: string;
    file: string;
    mime_type: string;
}

export interface WpImageFileMeta {
    aperture: string;
    credit: string;
    camera: string;
    caption: string;
    created_timestamp: string; //is a number in a string
    copyright: string;
    focal_length: string;
    iso: string;
    shutter_speed: string;
    title: string;
    orientation: string;
    keywords: string[];
}
