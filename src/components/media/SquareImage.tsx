import React, {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useResizeListener } from "./useResizeListener";
import { Size, SrcSet } from "./types";
import { addClass } from "../../util/classNames";
import "./square-image.css";
import { BestSizedImage } from "./BestSizedImage";

/**
 * does not require any props because fills width to 100%
 * Content is a component which takes props ({width, height}) and renders
 */
export interface WrapperProps {
  Content?: ComponentType<Size>;
  className?: string;
  initialWidth?: number;
}

/**
 * Callback ref makes it easy to set the height at the correct time
 * as soon as the div loads.
 *
 * Also need to respond to resize changes, so use a stored ref too.
 *
 * Note: due to debouncing, needs a useEffect cleanup
 * in case the debounce finishes after the component has unmounted.
 */
export const SquareWrapper = ({
  Content,
  className,
  initialWidth = 200,
}: WrapperProps) => {
  const [height, setHeight] = useState(initialWidth);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = useCallback(() => {
    if (ref.current) {
      setHeight(ref.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  useResizeListener(handleResize);

  const renderContent = () =>
    Content ? <Content width={height} height={height} /> : null;

  return (
    <div
      className={addClass("square-wrapper", className)}
      style={{ height }}
      ref={(el) => {
        if (el) {
          setHeight(el.clientWidth);
          ref.current = el;
        }
      }}
    >
      {renderContent()}
    </div>
  );
};

export const SquareImage = ({
  wrapperClass,
  width: imageWidth,
  height: imageHeight,
  ...props
}: SrcSet & { wrapperClass?: string }) => {
  const isHorizontal = imageWidth > imageHeight;
  return (
    <SquareWrapper
      initialWidth={200}
      className={wrapperClass}
      Content={({ width, height }) => (
        <BestSizedImage
          {...props}
          width={imageWidth}
          height={imageHeight}
          style={
            isHorizontal
              ? {
                  width: "auto",
                  maxWidth: "none",
                  height,
                }
              : {
                  height: "auto",
                  width,
                }
          }
          slot={isHorizontal ? { height } : { width }}
          className="square-image"
        />
      )}
    />
  );
};
