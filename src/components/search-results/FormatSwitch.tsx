import React, { ReactNode } from "react";
import { Button, Tooltip } from "antd";
import {
  AppstoreOutlined as Grid,
  DatabaseOutlined as List,
  BorderOutlined as Square,
} from "@ant-design/icons";
import "./format-switch.less";

export type ResultsFormat = "card" | "list" | "thumb";

export interface Props {
  format: ResultsFormat;
  onChange: (f: ResultsFormat, e: React.MouseEvent) => void;
}

export const FormatSwitch = ({ format, onChange }: Props) => {
  const renderButton = (f: ResultsFormat, icon: ReactNode, label: string) => {
    return (
      <Tooltip title={label}>
        <Button
          className={`choice ${f} ${format === f ? " active" : ""}`}
          onClick={(e) => onChange(f, e)}
        >
          {icon}
        </Button>
      </Tooltip>
    );
  };

  return (
    <div className="switch-format">
      {renderButton("card", <Square />, "Card View")}
      {renderButton("list", <List />, "List View")}
      {renderButton("thumb", <Grid />, "Thumbnail Image View")}
    </div>
  );
};
