import React, {useEffect} from "react";
import {useWpCollection} from "../../connected/useWpCollection";
import {LegacyPawPrint} from "../../elements/icons";
import {RenderPostCard} from "../../blog/BlogPostCard";

export const HomePosts = () => {
    const {objects, load, isLoading} = useWpCollection('posts', {_embed: 1});

    useEffect(() => {
        load()
    }, []);

    return (
        <section id="home-blog-posts" className="center-contents">
            <h2>Articles & Blogs</h2>
            <LegacyPawPrint/>
            {!!objects && (
                <div className="posts-group">
                    {objects.slice(0, 3).map(o => (
                        <RenderPostCard
                            post={o}
                            media={o._embedded["wp:featuredmedia"]?.[0]}
                         //   horizontal={true}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
