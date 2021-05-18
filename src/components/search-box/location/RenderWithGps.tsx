import React from "react";
import { EnvironmentTwoTone as GpsIcon } from "@ant-design/icons";
import { Button } from "antd";
import { ZipCodeInput } from "./ZipCodeInput";
import { RenderProps } from "./types";

/**
 * Access the user's GeoLocation when clicking on an icon.
 */
export const MinimalRenderLocationSelect = ({
  onFocusZip,
  setZip,
  zip,
  onClickGeo,
  isSupported,
}: RenderProps) => {
  return (
    <div className="paired-location-select">
      <ZipCodeInput
        initialValue={zip}
        onValidChange={setZip}
        onFocus={onFocusZip}
      />
      {isSupported && (
        <Button onClick={onClickGeo} type="text">
          <GpsIcon twoToneColor="white" /> Use My Current Location
        </Button>
      )}
    </div>
  );
};
