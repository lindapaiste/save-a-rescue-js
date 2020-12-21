import {ImageFile} from "./types";
import React from "react";

const createSrcSet = (sizes: ImageFile[]): string => {
    return sizes.map(size => `${size.src} ${size.width}w`).join(", ");
}

export interface SrcSet extends ImageFile {
    files?: ImageFile[];
    alt?: string;
}

export const SrcSetImage = ({files = [], alt = "", src, width, height, ...props}: SrcSet & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
    <img
        {...props}
        alt={alt}
        src={src}
        srcSet={createSrcSet(files)}
    />
)
//TODO: how to use 'sizes' property
