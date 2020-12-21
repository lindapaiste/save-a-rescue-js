import React, {useState} from "react";
import images from "./images.json";
import {ImageFile} from "../../src/media/types";
import "./trio.css";
import {CSSTransition} from "react-transition-group";
import {SrcSet, SrcSetImage} from "./SrcSetImage";

export const Photos = () => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <Trio images={images}/>
        </div>
    )
}

/**
 * need the area taken up by left and right to be the same if the middle image is to be centered
 */

export const Trio = ({images}: { images: SrcSet[] }) => {

    const [activeImage, setActiveImage] = useState(0);

    const [switchingTo, setSwitchingTo] = useState(0);

    console.log({activeImage, switchingTo});

    const [isEnlarged, setIsEnlarged] = useState(false);

    const current = images[activeImage];

    const prevIndex = activeImage === 0 ? images.length - 1 : activeImage - 1;

    const nextIndex = activeImage === images.length - 1 ? 0 : activeImage + 1;

    const handleClick = (index: number) => {
        if (index !== activeImage) {
            setSwitchingTo(index);
        }
    }

    const renderImage = (index: number) => (
        <TrioImage {...images[index]} onClick={() => handleClick(index)} isPrimary={index === activeImage}/>
    )

    return (
        <div
            className="images-trio"
            style={{}}>
            <div className="side-image previous">
                {renderImage(prevIndex)}
            </div>
            <CSSTransition
                in={switchingTo !== activeImage}
                timeout={2000}
                classNames="transition-primary"
                onEnter={() => setActiveImage(switchingTo)}
                onExiting={console.log}
            >
                <TrioImage {...images[activeImage]} isPrimary={true}/>
            </CSSTransition>
            <div className="side-image next">
                {renderImage(nextIndex)}
            </div>
        </div>
    );
}

interface ImageProps extends ImageFile {
    scale?: number;
    isPrimary?: boolean;
    onClick?: () => void;
}

const TrioImage = ({isPrimary = false, onClick, ...image}: ImageProps) => {
    return (
        <SrcSetImage
            className={"trio" + (isPrimary ? " primary" : "")}
            {...image}
            onClick={onClick}
        />
    )
}

