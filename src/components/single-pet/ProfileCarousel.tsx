import React from "react";
import Carousel from "antd/lib/carousel";
import { useWindow } from "../../util/useWindow";
import { BestSizedImage } from "../media/BestSizedImage";
import { SrcSet } from "../media/types";

/**
 * note: some images not properly rotated for smaller sizes: example: id=75817324
 */

/**
 * slider doesn't center when there is only one image, so need to handle separately
 */

/**
 * using two separate components because the divs themselves get different styling
 */
const SmallCarousel = ({
  images,
  width,
}: {
  images: SrcSet[];
  width: number;
}) => {
  return (
    <Carousel adaptiveHeight dots arrows draggable infinite>
      {images.map((image) => (
        <BestSizedImage
          key={image.src}
          {...image}
          style={{ width: "100%", height: "auto" }}
          slot={{ width }}
        />
      ))}
    </Carousel>
  );
};

const LargeCarousel = ({
  images,
  height,
}: {
  images: SrcSet[];
  height: number;
}) => {
  return (
    <Carousel
      dots
      arrows
      infinite
      centerMode
      slidesToShow={1}
      slidesToScroll={1}
      variableWidth
      style={{ height }}
      draggable
      focusOnSelect
    >
      {images.map((image) => (
        <div
          key={image.src}
          style={{ height, width: (height / image.height) * image.width }}
        >
          <BestSizedImage
            {...image}
            style={{ height, width: "auto" }}
            slot={{ height }}
          />
        </div>
      ))}
    </Carousel>
  );
};

// TODO: gallery transitions
// TODO: keep aspect ratio of first image
export const ProfileCarousel = ({ images }: { images: SrcSet[] }) => {
  const window = useWindow();

  if (window.width <= 480) {
    return <SmallCarousel images={images} width={window.width} />;
  }
  const height = Math.max(300, 0.5 * window.height);
  if (images.length === 1) {
    return (
      <div className="center-contents" style={{ height }}>
        <BestSizedImage {...images[0]} slot={{ height }} className="max-size" />
      </div>
    );
  }
  return <LargeCarousel images={images} height={height} />;
};
