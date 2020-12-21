import React, {ReactNode} from "react";
import Square from "@ant-design/icons/BorderOutlined";
import Grid from "@ant-design/icons/AppstoreOutlined";
import List from "@ant-design/icons/DatabaseOutlined";
import {Tooltip} from "antd";
import "./format-switch.css";

export type ResultsFormat = 'card' | 'list' | 'thumb';

export interface Props {
    format: ResultsFormat;
    onChange: (f: ResultsFormat, e: React.MouseEvent) => void;
}

export const FormatSwitch = ({format, onChange}: Props) => {

    const renderButton = (f: ResultsFormat, icon: ReactNode, label: string) => {
        return (
            <Tooltip title={label}>
            <div
                className={`choice ${f} ${format === f ? " active" : ""}`}
                onClick={e => onChange(f, e)}
            >
                {icon}
            </div>
            </Tooltip>
        )
    }

    return (
        <div className="switch-format">
            {renderButton("card", <Square />, "Card View")}
            {renderButton("list", <List />, "List View")}
            {renderButton("thumb", <Grid />, "Thumbnail Image View")}
        </div>
    );
}
