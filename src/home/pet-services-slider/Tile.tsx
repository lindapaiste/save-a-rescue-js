import React from "react"
import "./style.less";

export interface TileProps {
    name: string;
    slug: string;
    icon: string;
    background: string;
}

export const Tile = ({name, slug, icon, background}: TileProps) => {
    return (
        <a
           href={`http://savearescue.org/pet-services-directory/categories/${slug}`}
           className={`sar-pet-service ${slug}`}
        >
            <img
                src={background}
                alt={name}
                width="300"
                height="200"
                className="background"
            />
            <div className="sar-inner center-contents">
                <div className="icon-wrapper center-contents">
                <img
                    src={icon}
                    alt={name}
                    width="200"
                    height="200"
                />
                </div>
                <h2>{name}</h2>
            </div>
        </a>
    )
}
