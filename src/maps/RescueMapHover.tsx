import React from "react";
import "../orgsandrescues/rescue-list.css";

/** TODO: fix position overflow when near edges of map */

export interface HoverProps {
    title: string;
    address: string;
    distance?: number;
}

export const RescueMapHover = ({address, title, distance}: HoverProps) => {
    return (
        <div className="rescue-map-hover">
            <div className="title">{title}</div>
            <div className="info">
                <div className="location">
                    <span className="address">{address}</span>
                </div>
            </div>
        </div>
    )
}
