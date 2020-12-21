import React from "react";
import "./ratings-box.css";
import {BarRating} from "../elements/ratings-bar/Bar";

/**
 * rather than defining an object with the properties, define in a generic way with a label and value
 */
export interface Rating {
    label: string;
    value: number;
}

export const RatingsBox = ({ratings, className}: { className?: string; ratings: Rating[] }) => {
    return (
        <div className={`ratings-box ${className || ''}`}>
            <ul>
                {ratings.map((rating, i) => (
                    <li key={i}>
                        <div className="label">{rating.label}</div>
                        <BarRating
                            filled={rating.value}
                            total={10}
                            numbered={true}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
