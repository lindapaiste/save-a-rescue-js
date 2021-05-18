import React from "react";
import "./fact-bar.less";
import { BarRating } from "../elements/ratings-bar/Bar";
import isDev from "../../util/isDev";

export interface Props<T extends string> {
  /**
   * the enum value, or will display nothing if undefined
   */
  value: T | undefined;
  /**
   * title for the section
   */
  title: string;
  /**
   * can pass a custom value for the label, or use the string
   */
  label?: string;
  /**
   * find the amount for this value by passing a lookup array which has all of the values of T in order
   */
  ordered: readonly T[];
}

/**
 * thought about using a map, but passing an ordered array is easier
 */
export const EnumBar = <T extends string>({
  value,
  title,
  label,
  ordered,
}: Props<T>) => {
  if (value === undefined) return null;
  // Case-insensitive lookup
  const filled = ordered.findIndex(
    (text) => text.toLowerCase() === value.toLowerCase()
  );
  if (filled === -1) {
    if (isDev()) {
      // eslint-disable-next-line no-console
      console.error(`value ${value} not found in`, ordered);
    }
    return null;
  }
  return (
    <div className="fact-bar" key="label">
      <div className="fact-bar-title">{title}</div>
      <BarRating
        filled={filled}
        total={ordered.length - 1} // -1 because 0-indexed
        minimumFill={2}
      />
      <div className="fact-bar-label">{label || value}</div>
    </div>
  );
};
