import {SrcSet, SrcSetImage} from "./SrcSetImage";
import React, {ComponentType, createRef, useCallback, useEffect, useState} from "react";
import {useResizeListener} from "./useResizeListener";
import {Size} from "./types";
import {addClass} from "../util/misc";
import "./square-image.css";

/**
 * does not require any props because fills width to 100%
 * Content is a component which takes props ({width, height}) and renders
 */
export interface WrapperProps {
    Content?: ComponentType<Size>;
    className?: string;
    initialWidth?: number;
}

export const SquareWrapper = ({Content, className, initialWidth = 200}: WrapperProps) => {
    const [height, setHeight] = useState(initialWidth);

    const ref = createRef<HTMLDivElement>();

    const handleResize = useCallback(() => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            if (width !== height) {
                setHeight(width);
            }
        }
    }, [height, ref, ref.current]);

    useResizeListener(handleResize);
    useEffect(handleResize, [ref, handleResize]);

    const renderContent = () => {
        if (Content) {
            return (
                <Content width={height} height={height}/>
            )
        }
    }

    return (
        <div
            className={addClass("square-wrapper", className)}
            style={{
                width: "100%",
                height,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
            ref={ref}
            onLoad={(e) => {/*
                const width = e.currentTarget.clientWidth;
                if ( width !== height ) {
                    setHeight(width);
                }*/
            }}
        >
            {renderContent()}
        </div>
    )
}

export const SquareImage = ({wrapperClass, ...props}: SrcSet & { wrapperClass?: string }) => {
    return (
        <SquareWrapper
            initialWidth={200}
            className={wrapperClass}
            Content={({width, height}) => (
                <SrcSetImage
                    {...props}
                    style={props.width > props.height ? {
                        width: "auto",
                        maxWidth: "none",
                        height,
                    } : {
                        height: "auto",
                        width,
                    }}
                />
            )}
        />
    )
}
