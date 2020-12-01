import {SrcSet, SrcSetImage} from "./SrcSetImage";
import React from "react";
import Carousel from "antd/lib/carousel";
import {useWindow} from "../../util/useWindow";

//TODO: gallery transitions
//TODO: keep aspect ratio of first image
export const SlickCarousel = ({images}: { images: SrcSet[] }) => {

    const window = useWindow();

    if (window.width <= 480) {
        return (<SmallCarousel images={images}/>)
    } else {
        const height = Math.max(300, .5 * window.height);
        if (images.length === 1) {
            return (
                <div className="center-contents" style={{height}}>
                    <SrcSetImage {...images[0]} className="max-size"/>
                </div>
            )
        }
        return (
            <LargeCarousel images={images} height={height}/>
        );
    }
}

/**
 * slider doesn't center when there is only one image, so need to handle separately
 */

/**
 * using two separate components because the divs themselves get different styling
 */
const SmallCarousel = ({images}: { images: SrcSet[] }) => {
    return (
        <Carousel
            adaptiveHeight={true}
            dots={true}
            arrows={true}
            draggable={true}
            infinite={true}
        >
            {images.map((image, i) => (<SrcSetImage key={i} {...image} style={{width: "100%", height: "auto"}}/>))}
        </Carousel>
    )
}

const LargeCarousel = ({images, height}: { images: SrcSet[], height: number }) => {
    return (
        <Carousel
            dots={true}
            arrows={true}
            infinite={true}
            centerMode={true}
            slidesToShow={1}
            slidesToScroll={1}
            variableWidth={true}
            style={{height}}
            draggable={true}
            focusOnSelect={true}
        >
            {images.map((image, i) => (
                <div key={i} style={{height, width: (height / image.height) * image.width}}>
                    <SrcSetImage {...image} style={{height, width: "auto"}}/>
                </div>
            ))}
        </Carousel>
    )
}
