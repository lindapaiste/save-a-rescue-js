import React, { ReactNode } from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./pros-and-cons.less";
import { BreedData, TitleAndText } from "./types";

/**
 * Shared logic for a "pro" and a "con".
 * The difference is the icon.
 */
const RenderItem = ({
  title,
  text,
  icon,
}: TitleAndText & { icon: ReactNode }) => {
  return (
    <li>
      <div className="icon">{icon}</div>
      <div>
        <div className="title">
          <span className="text">{title}</span>
        </div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
};

/**
 * Renders items from both sections.
 */
export const ProsAndCons = ({
  pros,
  cons,
}: Pick<BreedData, "pros" | "cons">) => {
  return (
    <div id="prosandcons">
      <section id="pros">
        <h3>Pros</h3>
        <ul>
          {pros.map((item) => (
            <RenderItem
              {...item}
              key={item.title}
              icon={<CheckCircleOutlined />}
            />
          ))}
        </ul>
      </section>
      <section id="cons">
        <h3>Cons</h3>
        <ul id="cons">
          {cons.map((item) => (
            <RenderItem
              {...item}
              key={item.title}
              icon={<ExclamationCircleOutlined />}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
