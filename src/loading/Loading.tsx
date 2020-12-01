import React from "react";
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

export interface Props {
    size?: number;
}

export const Loading = ({size = 50}: Props) => {
    return (
        <div className="center-contents">
        <Spin
            indicator={
                <LoadingOutlined
                    style={{fontSize: size}}
                    spin
                />
            }
        />
        </div>
    )
}
