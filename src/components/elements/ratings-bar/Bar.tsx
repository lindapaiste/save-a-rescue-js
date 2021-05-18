import "./bar.less";
import { range } from "lodash";
import React, { ReactNode } from "react";
import { combineClasses } from "../../../util/classNames";

interface Props {
  filled: number;
  total: number;
  minimumFill?: number;
  children?: ReactNode;
  className?: string;
  numbered?: boolean;
}

/**
 * can show individual rounded boxes to give a sense of discreteness -- or not
 *
 * if value is 0, include a tiny hit of color for clarity
 *
 * total defaults to 100 so can enter a percentage like 93 as filled
 *
 * prop numbered => numbers shown behind the fill
 */
export const BarRating = ({
  filled,
  total = 100,
  minimumFill = 0,
  numbered = false,
  children,
  className,
}: Props) => {
  const each = 100 / total;
  const rawPercent = filled * each;
  const width = `${Math.max(rawPercent, minimumFill)}%`;

  return (
    <div
      className={combineClasses([
        "bar-rate",
        className,
        numbered ? "numbered" : undefined,
      ])}
    >
      {children}
      {numbered && (
        <span className="numbers">
          {range(1, total + 1).map((n) => (
            <span style={{ width: `${each}%` }} key={n}>
              {n}
            </span>
          ))}
        </span>
      )}
      <div className="filled" style={{ width }} />
    </div>
  );
};
