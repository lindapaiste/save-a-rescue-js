import React from "react";
import "./ratings-box.less";
import { BarRating } from "../elements/ratings-bar/Bar";
import { addClass } from "../../util/classNames";

/**
 * rather than defining an object with the properties, define in a generic way with a label and value
 */
export interface Rating {
  label: string;
  value: number;
}

export const RatingsBox = ({
  ratings,
  className,
}: {
  className?: string;
  ratings: Rating[];
}) => {
  return (
    <div className={addClass("ratings-box", className)}>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.label}>
            <div className="label">{rating.label}</div>
            <BarRating filled={rating.value} total={10} numbered />
          </li>
        ))}
      </ul>
    </div>
  );
};
