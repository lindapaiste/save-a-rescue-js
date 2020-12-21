import {SearchSlug} from "./types";
import React from "react";
import "./sprite.less";
export interface Props {
    active?: boolean;
    slug: SearchSlug;
}

/**
 * previously the sprite was used as the background for the whole div.  If making the div taller, need to to crop the
 * area with the sprite background so the edges of the sprite above and below won't show
 */

export const Sprite = ({active, slug}: Props) => {
    return (
        <div className={`search-tabs-sprite ${slug} ${active ? "active" : ""}`}/>
    )
}
