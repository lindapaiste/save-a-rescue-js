import React from "react";
import { ZipCodeInput } from "./ZipCodeInput";
import { RenderProps } from "./types";

/**
 * Simplest render component for LocationSelect just shows the zip code.
 */
export const RenderZipOnly = ({ zip, setZip, onFocusZip }: RenderProps) => {
  return (
    <ZipCodeInput
      initialValue={zip}
      onValidChange={setZip}
      onFocus={onFocusZip}
    />
  );
};
