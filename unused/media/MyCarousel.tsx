import React, {useState} from "react";
import {ImageFile, Size} from "../../src/media/types";
import {toHeight} from "../../src/media/size-util";

export interface CarouselProps extends Size {
    images: ImageFile[];
}



/**
 * want to start with first image centered
 *
 * not sure the best way to loop around
 * have all images in twice?
 */



export const Carousel = ({width, height, images}: CarouselProps) => {

    const [offset, setOffset ] = useState(0);

    const [activeImage, setActiveImage] = useState(0);

    return (
        <div style={{
            width,
            height,
            //overflow: "hidden",
            marginLeft: 0,
            display: "flex",
            flexDirection: "row",
        }}>
            {images.map(toHeight(height)).map((image, i) => (
                <CarouselImage
                    key={i}
                    {...image}
                />
            ))}
        </div>
    );
}

export const CarouselImage = ({width, height, src, alt}: ImageFile) => {
    return (
        <div style={{
            padding: 10,
        }}>
            <div //used material-ui paper, but want to remove dependency
                   style={{
                       height, width //should not need this
                   }}>
                <img src={src} style={{width, height}} width={width} height={height} alt={alt || "some pet"}/>
            </div>
        </div>
    )
}
