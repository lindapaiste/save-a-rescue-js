import "./style.css";
import {ButtonProps} from "antd/lib/button";
import React from "react";
import {Button} from "antd";
import {RightOutlined} from "../icons";
import {IconAndText} from "../../util/IconAndText";
import {addClass} from "../../util/misc";

export const ChevronHoverButton = ({children, className, ...props}: ButtonProps) => {
    return (
        <Button
            {...props}
            className={addClass(className, "chevron-hover-button")}
        >
            <IconAndText
                icon={<RightOutlined className="chevron-icon"/>}
                text={children}
                after={true}
            />
        </Button>
    )
}
