import {Image} from "./types";
import React from "react";

const createSrcSet = (sizes: Image[]): string => {
    return sizes.map(size => `${size.src} ${size.width}w`).join(", ");
}

export interface SrcSet extends Image {
    sizes?: Image[];
    alt?: string;
}

export const SrcSetImage = ({sizes = [], alt = "", src, width, height, ...props}: SrcSet & Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'sizes'>) => (
    <img
        {...props}
        alt={alt}
        src={src}
        srcSet={createSrcSet(sizes)}
    />
)
