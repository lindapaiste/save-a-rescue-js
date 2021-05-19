import { ButtonProps } from "antd/lib/button";
import React from "react";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { IconAndText } from "../../../util/IconAndText";
import { addClass } from "../../../util/classNames";
import "./chevron-hover-button.less";

export const ChevronHoverButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button {...props} className={addClass(className, "chevron-hover-button")}>
      <IconAndText
        icon={<RightOutlined className="chevron-icon" />}
        text={children}
        after
      />
    </Button>
  );
};
