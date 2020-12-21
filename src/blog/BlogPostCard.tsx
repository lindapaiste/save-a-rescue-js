import {WpPostJson} from "../clientWp/objects/each/PostSchema";
import React from "react";
import {WpImg} from "../media/WpImg";
import {postPublished} from "../strings/date";
import {WpMediaEmbedded} from "../clientWp/objects/each/MediaSchema";
import he from "he";

import "./blog-post-card.less";

export interface Props {
    post: WpPostJson;
    media?: WpMediaEmbedded;
    horizontal?: boolean;
}

export const RenderPostCard = ({post, media, horizontal}: Props) => {
    const {title, featured_media, date, excerpt, link, id} = post;

    // TODO: placeholder when no featured image?

    // could show author

    return (
        <article className={`post-card elevated-card post-id-${id} ${horizontal ? 'horizontal' : 'vertical'}`}>

                <div className="featured-image-container">
                    { !!media &&
                        <a
                            href={link}
                            className="entry-featured-image-url"
                        >
                            <WpImg
                                size="et-pb-post-main-image"
                                media={media}
                                alt={title.rendered}
                            />
                        </a>
                    }
                </div>
            <div className="text-container">

                <h2 className="entry-title">
                    <a href={link}>
                        {he.decode(title.rendered)}
                    </a>
                </h2>

                <p className="post-meta">
                    <span className="published">{postPublished(date)}</span>
                </p>
                <div className="post-content">
                    <div className="post-content-inner" dangerouslySetInnerHTML={{
                        __html: excerpt.rendered
                    }}/>
                    <a href={link} className="more-link">read more</a>
                </div>
            </div>

        </article>
    )
}
