import React from "react";
import "./basic-info.less";
import { BasicInfoData, FactData } from "./types";

/**
 * Render an individual fact.
 */
const Fact = ({ label, value, units }: FactData) => {
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

/**
 * Want the items to be in columns where the columns are spaced to even out the padding,
 * but the items in the column still line up with each other.
 */
export const BasicInfo = ({ image, facts, name }: BasicInfoData) => {
  return (
    <div className="basic-info">
      <div className="image">
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={name}
        />
      </div>
      <div className="info">
        <h1 className="title">{name}</h1>
        <div className="fact-box">
          <div className="left">
            {facts
              .filter((_, i) => i % 2 === 0)
              .map((fact) => (
                <Fact key={fact.label} {...fact} />
              ))}
          </div>
          <div className="right">
            {facts
              .filter((_, i) => i % 2 !== 0)
              .map((fact) => (
                <Fact key={fact.label} {...fact} />
              ))}
          </div>
        </div>

        <div className="credit">{image.credit}</div>
      </div>
    </div>
  );
};
