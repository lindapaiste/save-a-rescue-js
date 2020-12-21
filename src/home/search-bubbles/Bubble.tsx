import React from "react";

/**
 * places an absolute-positioned solid-color circle on the banner
 */

interface BubbleProps {
    /**
     * top and left take percentages as raw numbers, then add the `%` to them
     */
    top: number;
    left: number;
    size: number;
    color: 'white' | 'cream' | 'pink' | 'peach' | 'yellow' | 'orange';
    lighter?: boolean;
}

export const Bubble = ({top, left, size, color, lighter}: BubbleProps) => {
    const classes = ['bubble', color, 'size-' + size];
    if (lighter) {
        classes.push('lighter');
    }
    return (
        <div
            className={classes.join(' ')}
            style={{
                top: top + '%',
                left: left + '%'
            }}
        />
    )
}
