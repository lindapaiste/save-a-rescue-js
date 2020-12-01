/**
 * puts the icon and the text in separate spans so that they can be targeted by nested CSS rules
 */
import React, {ReactNode} from "react";

export interface Props {
    icon: ReactNode;
    text: ReactNode;
    separator?: ReactNode;
    /**
     * if true, put the icon after the text.  defaults to false for before.
     */
    after?: boolean;
}

export const IconAndText = ({icon, text, separator = " ", after = false}: Props) => {
    return (
        <>
            <span className={after ? "text" : "icon"}>{after ? text : icon}</span>
            {separator}
            <span className={after ? "icon" : "text"}>{after ? icon : text}</span>
        </>
    )
}
