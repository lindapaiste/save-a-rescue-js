import React, {ReactNode} from "react";
import {SeparatorProps} from "./IconAndText";

export interface Props extends SeparatorProps {
    label: ReactNode;
    value: ReactNode;
}

/**
 * these class names can be targeted by individual elements for styling and formatting
 */
export const LabelAndValue = ({label, value, separator = " "}: Props) => {
    return (
        <span className="label-and-value">
            <span className="value">{value}</span>
            {separator}
            <span className="label">{label}</span>
        </span>
    );
};
