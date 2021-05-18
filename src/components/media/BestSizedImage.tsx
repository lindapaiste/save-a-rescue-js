import React from "react";
import { ImageFile, SrcSet } from "./types";

const largestSize = (
  files: ImageFile[],
  dimension: "width" | "height"
): ImageFile => {
  return files.reduce((a, b) => (a[dimension] > b[dimension] ? a : b));
};

const smallestSize = (
  files: ImageFile[],
  dimension: "width" | "height"
): ImageFile => {
  return files.reduce((a, b) => (a[dimension] < b[dimension] ? a : b));
};

/**
 * assumes object-fit = cover
 * finds smallest that covers
 */
const findBestSize = (
  files: ImageFile[],
  slot: number,
  dimension: "width" | "height"
): ImageFile => {
  const covers = files.filter((f) => f[dimension] >= slot);
  if (covers.length) {
    return smallestSize(covers, dimension);
  }
  return largestSize(files, dimension);
};

type Props = SrcSet &
  Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "slot"
  > & {
    slot:
      | {
          width: number;
        }
      | {
          height: number;
        };
  };

/**
 * just load the closest image size for the slot, not the whole SrcSet
 */
export const BestSizedImage = ({
  files = [],
  alt = "",
  src,
  width,
  height,
  slot,
  ...props
}: Props) => {
  /**
   * make sure that the primary/default size is included
   */
  const allFiles = files?.find((f) => f.width === width)
    ? files
    : files?.concat({ src, width, height });
  const best =
    "width" in slot
      ? findBestSize(allFiles, slot.width, "width")
      : findBestSize(allFiles, slot.height, "height");

  return <img {...props} {...best} alt={alt} />;
};
