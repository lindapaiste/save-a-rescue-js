import React from "react";

/**
 * rather than defining an object with the properties, define in a generic way with a label and value
 */
export interface Rating {
  label: string;
  value: number;
}

export const RatingsBox = ({ ratings }: { ratings: Rating[] }) => {
  return (
    <div className="right cust_rit_degn singleG-box">
      <ul>
        {ratings.map((rating, i) => (
          <li key={i}>
            <p>{rating.label}</p>
            <div className="single-graph">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <div className="bar" style={{ width: 10 * rating.value + "%" }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
