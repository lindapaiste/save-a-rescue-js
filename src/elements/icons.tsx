import React from "react";

export {default as RightOutlined} from "@ant-design/icons/RightOutlined";
export {default as LeftOutlined} from "@ant-design/icons/LeftOutlined";
export {default as UpOutlined} from "@ant-design/icons/UpOutlined";
export {default as DownOutlined} from "@ant-design/icons/DownOutlined";
export {default as RightCircleOutlined} from "@ant-design/icons/RightCircleOutlined";
export {default as LeftCircleOutlined} from "@ant-design/icons/LeftCircleOutlined";
export {default as CheckCircleOutlined} from "@ant-design/icons/CheckCircleOutlined";
export {default as CloseCircleOutlined} from "@ant-design/icons/CloseCircleOutlined";
export {default as ExclamationCircleOutlined} from "@ant-design/icons/ExclamationCircleOutlined";

export const LegacyPawPrint = ({className}: {className?: string}) => {
    return (
        <img className={className}
             src="https://savearescue.org/wp-content/uploads/2020/04/blog-icon.png"
             alt="paw print"
             data-src="https://savearescue.org/wp-content/uploads/2020/04/blog-icon.png"
             loading="lazy"
        />
    )
}
