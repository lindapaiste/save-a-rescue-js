import React, { ReactNode } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { TitleAndText } from "../types";
import "./do-or-dont.less";

interface DoOrDontConfig {
  icon: ReactNode;
  before?: ReactNode;
  slug: string;
}

const DoOrDont = ({
  title,
  icon,
  before,
  slug,
}: TitleAndText & DoOrDontConfig) => {
  return (
    <div className={`dos-donts ${slug}`}>
      <span className="label">
        <span className="icon">{icon}</span>
        {!!before && <span className="text">{before}</span>}
      </span>
      {before ? " " : ""}
      <span className="title">{title}</span>
    </div>
  );
};

export const Do = (props: TitleAndText) => {
  return (
    <DoOrDont slug="do" before="Do" icon={<CheckCircleOutlined />} {...props} />
  );
};

export const Dont = (props: TitleAndText) => {
  return (
    <DoOrDont
      slug="dont"
      before="Don't"
      icon={<CloseCircleOutlined />}
      {...props}
    />
  );
};

export const Warn = (props: TitleAndText) => {
  return (
    <DoOrDont slug="warn" icon={<ExclamationCircleOutlined />} {...props} />
  );
};
