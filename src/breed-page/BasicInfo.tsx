import React from "react";
import "./basic-info.css";

/**
 * want the items to be in columns where the columns are spaced to even out the padding,
 * but the items in the column still line up with each other
 */

const facts: FactProps[] = [
    {
        label: "Breed Group",
        value: "Non-Sporting"
    },
    {
        label: "Origin",
        value: "Yugoslavia"
    },
    {
        label: "Average Height",
        value: "19 - 24",
        units: "inches"
    },
    {
        label: "Average Weight",
        value: "45 - 57",
        units: "pounds"
    },
    {
        label: "Life Span",
        value: "12 - 16",
        units: "years"
    }
];

export interface FactProps {
    label: string;
    value: string;
    units?: string;
}

export const Fact = ({label, value, units}: FactProps) => {
    return (
        <div className="fact">
            <div className="label">{label}</div>
            <div className="value">
                <span className="value">{value}</span>
                {units && (
                    <>
                        {" "}
                        <span className="units">{units}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export const BasicInfo = () => {
    return (
        <div className="basic-info">
            <div className="image">
                <img
                    src="https://savearescue.org/wp-content/uploads/2013/06/DalmationHeadExcellent3.jpg"
                    alt="Dalmation"
                />
            </div>
            <div className="info">
                <h1 className="title">Dalmatian</h1>
                <div className="fact-box">
                    <div className="left">
                    {facts.filter((_, i) => i % 2 === 0 ).map((fact, i) => (
                        <Fact key={i} {...fact} />
                    ))}
                    </div>
                    <div className="right">
                        {facts.filter((_, i) => i % 2 !== 0 ).map((fact, i) => (
                            <Fact key={i} {...fact} />
                        ))}
                    </div>
                </div>

                <div className="credit">
                    Photo Courtesy of: Dalmatian Rescue of Illinois
                </div>
            </div>
        </div>
    );
};

//<Statistic key={i} title={fact.label} value={fact.value} suffix={fact.units}/>
