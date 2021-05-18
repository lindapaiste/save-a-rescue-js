import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGeoLocation } from "../../../services/location/geolocation/useGeoLocation";
import { useSelector } from "../../../services/store";
import {
  isLatLon,
  isZip,
  normalizeZip,
} from "../../../services/location/formatting/validation";
import { LatLon } from "../../../services/location/types";
import { useUserLocation } from "../../../services/location/useUserLocation";
import { selectMatchingLocation } from "../../../services/location/redux/selectors";
import { receiveZip } from "../../../services/location/redux/actions";
import { Props } from "./types";

export const LocationSelect = ({ onChange, Render }: Props) => {
  /**
   * whichever was more recently clicked/focused, regardless of validation
   */
  const [selected, setSelected] = useState<"zip" | "geo">("zip");

  /**
   * stateful value of latLon and zip accessed from hook
   * zip is now stored in redux, only after it has passed validation
   */
  const geo = useGeoLocation();
  const { loadLocation } = geo;
  const zip = useSelector(selectMatchingLocation(isZip))?.zip;
  const latLon = useSelector(selectMatchingLocation<LatLon>(isLatLon));

  /**
   * Call hook to trigger ip fetching
   */
  useUserLocation();

  const dispatch = useDispatch();
  const setZip = (newZip: string) => dispatch(receiveZip(newZip, "input"));

  /**
   * updates selection and triggers location loading
   */
  const handleButtonClick = () => {
    setSelected("geo");
    loadLocation();
  };

  /**
   * just updates selection
   */
  const handleZipFocus = () => {
    setSelected("zip");
  };

  /**
   * set location when it is done loading
   * listen to changes in all three in order to always set the right location
   */
  useEffect(
    () => {
      // TODO: should not have to do this in multiple places
      const normalized = zip ? normalizeZip(zip) : undefined;

      if (selected === "zip" && normalized) {
        onChange?.({ zip: normalized });
      } else if (latLon) {
        onChange?.(latLon);
      } else if (normalized) {
        onChange?.({ zip: normalized });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latLon, selected, zip]
  );

  return (
    <Render
      {...geo}
      zip={zip}
      setZip={setZip}
      onClickGeo={handleButtonClick}
      onFocusZip={handleZipFocus}
      isGeoSelected={selected === "geo"}
      isZipSelected={selected === "zip"}
    />
  );
};
