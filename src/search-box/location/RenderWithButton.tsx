import React, {FunctionComponent} from "react";
import {Button} from "antd";
import {ZipCodeInput} from "./ZipCodeInput";
import {RenderProps} from "./LocationSelect";

import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import AimOutlined from "@ant-design/icons/AimOutlined";

export const RenderLocationSelect: FunctionComponent<RenderProps> = ({isLoading, latLon, setZip, onFocusZip, onClickGeo, error, zip, isGeoSelected, isSupported}) => {
    return (
        <div className="paired-location-select">
            <div className="location-grouping">
                {isSupported &&
                <>
                    <Button
                        danger={!!error}
                        loading={isLoading}
                        type={isGeoSelected && !!latLon ? "primary" : "default"}
                        onClick={onClickGeo}
                        icon={latLon ? <CheckCircleOutlined/> : <AimOutlined/>}
                    >
                        Near Me
                    </Button>
                    <span>OR</span>
                </>
                }
                <ZipCodeInput
                    initialValue={zip}
                    onValidChange={setZip}
                    onFocus={onFocusZip}
                />
            </div>
        </div>
    )
}
