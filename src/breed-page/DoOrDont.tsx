import {TitleAndText} from "./types";
import React, {ReactNode} from "react";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import "./do-or-dont.css";

interface DoOrDontConfig {
    icon: ReactNode;
    before?: ReactNode;
    slug: string;
}

const DoOrDont = ({title, text, icon, before, slug}: TitleAndText & DoOrDontConfig) => {
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
        <DoOrDont
            slug="do"
            before="Do"
            icon={<CheckCircleOutlined/>}
            {...props}
        />
    );
};

export const Dont = (props: TitleAndText) => {
    return (
        <DoOrDont
            slug="dont"
            before="Don't"
            icon={<CloseCircleOutlined/>}
            {...props}
        />
    );
};

export const Warn = (props: TitleAndText) => {
    return (
        <DoOrDont
            slug="warn"
            icon={<ExclamationCircleOutlined/>}
            {...props}
        />
    );
};
