import {RenderProps} from "./LocationSelect";
import {ZipCodeInput} from "./ZipCodeInput";
import React from "react";

export const RenderZipOnly = ({zip, setZip, onFocusZip}: RenderProps) => {
    return (
        <ZipCodeInput
            initialValue={zip}
            onValidChange={setZip}
            onFocus={onFocusZip}
        />
    )
}
