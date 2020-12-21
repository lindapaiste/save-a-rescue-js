import images from "./images.json";
import React, {useState} from "react";
import {Carousel as RRCarousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {ImageFile} from "../../src/media/types";

export const Photos = () => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <RRCarousel centerMode={true} dynamicHeight={true} centerSlidePercentage={50}>
                {images.map((image, i) => (
                    <CarouselImage
                        key={i}
                        {...image}
                    />
                ))}
            </RRCarousel>
        </div>
    )
}

export const CarouselImage = ({width, height, src, alt}: ImageFile) => {
    return (
        <img src={src} width={width} height={height} alt={alt || "some pet"}/>
    )
}
