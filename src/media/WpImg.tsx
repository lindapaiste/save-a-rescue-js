import {WpImageSize, WpMediaEmbedded, WpMediaJson} from "../clientWp/objects/each/MediaSchema";
import {ImageFile} from "./types";
import React from "react";
import {addClass} from "../util/misc";

// file and mime type aren't needed
export type WpImageBasic = Pick<WpImageSize, 'width' | 'height' | 'source_url'>

export interface NamedImageSize {
    name: string;
    file: WpImageBasic;
}

export interface Props {
    size: string;
    media: WpMediaJson | WpMediaEmbedded;
    alt?: string;
    className?: string;
}

//TODO: multisize with srcset, but aware of aspect ratio

export const WpImg = ({size, media, alt, className}: Props) => {
    const file = toImageFile(getSize(media, size));

    /**
     * for the size in the class name, wordpress appears to use the requested size even when serving a fallback full-size file
     */
    return (
        <img
            {...file}
            alt={alt || media.alt_text}
            className={addClass(`wp-image size-${size}`, className )}
        />
    )
}

/**
 * first looks for the named size, then the 'full' size, and finally the file itself
 * tiny images will have no sizes! ex. https://savearescue.org/wp-json/wp/v2/media/1579
 */
export const getSize = (media: WpMediaJson | WpMediaEmbedded, size: string): WpImageBasic => {
    const {sizes} = media.media_details;
    const target = sizes[size];
    if ( target ) return target;
    const full = sizes.full;
    if ( full ) return full;
    return {
        ...media.media_details,
        source_url: media.source_url
    }
}

/**
 * rename source_url to src, drop uneeded
 */
export const toImageFile = ({width, height, source_url}: WpImageBasic ): ImageFile => ({
    width,
    height,
    src: source_url
})
