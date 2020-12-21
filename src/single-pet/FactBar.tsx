import React from "react";
import "./fact-bar.css";
import {BarRating} from "../elements/ratings-bar/Bar";

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
export const EnumBar = <T extends string>({value, title, label, ordered}: Props<T>) => {
    if (value === undefined) return null;
    const total = ordered.length - 1; // -1 for 0 indexed
    const filled = ordered.indexOf(value);
    if (filled === -1) {
        console.log(`value ${value} not found in`, ordered);
        return null;
    }
    return (
        <div className="fact-bar" key="label">
            <div className="fact-bar-title">{title}</div>
            <BarRating
                filled={filled}
                total={total}
                minimumFill={2}
            />
            <div className="fact-bar-label">{label || value}</div>
        </div>
    )
}

