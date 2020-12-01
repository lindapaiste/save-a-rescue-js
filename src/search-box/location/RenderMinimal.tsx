import {RenderProps} from "./LocationSelect";
import {ZipCodeInput} from "./ZipCodeInput";
import GpsIcon from "@ant-design/icons/EnvironmentTwoTone";
import React from "react";

export const MinimalRenderLocationSelect = ({onFocusZip, setZip, zip, onClickGeo, isSupported}: RenderProps) => {
    return (
        <div className="paired-location-select">
            <ZipCodeInput
                initialValue={zip}
                onValidChange={setZip}
                onFocus={onFocusZip}
            />
            {isSupported &&
            <div onClick={onClickGeo}><GpsIcon twoToneColor="white"/> Use My Current Location</div>
            }
        </div>
    )
}
