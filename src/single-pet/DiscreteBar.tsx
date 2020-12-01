import {Col} from "antd";
import React from "react";
import "./bar.css";

/**
 * can show individual rounded boxes to give a sense of discreteness -- or not
 *
 * if value is 0, include a tiny hit of color for clarity
 */
export const DiscreteBar = ({filled, total}: { filled: number, total: number }) => {
    const width = filled === 0 ? 2 : `${100 * filled / total}%`;

    return (
        <div className="gpaph">
            <div className="filled" style={{width}}/>
        </div>
    )
}

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
        <Col xs={12} sm={8} md={24} lg={12}>
            <div className="fact-bar">
                <div className="fact-bar-title">{title}</div>
                <DiscreteBar
                    filled={filled}
                    total={total}
                />
                <div className="fact-bar-label">{label || value}</div>
            </div>
        </Col>
    )
}

