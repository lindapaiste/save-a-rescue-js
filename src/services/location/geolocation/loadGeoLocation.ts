import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocHistoryItem } from "../redux/types";

/**
 * Async thunk action to get the user's GeoLocation.
 */
export const loadGeoLocation = createAsyncThunk(
  "location/geo/load",
  async (): Promise<LocHistoryItem> => {
    /**
     * Make sure that GeoLocation exists in the browser.
     */
    const geoLoc = navigator?.geolocation;

    if (!geoLoc) {
      throw new Error("GeoLocation is not supported by your browser");
    }

    /**
     * GeoLocation uses callbacks, so wrap it in a promise to handle asynchronously.
     */
    // eslint-disable-next-line no-undef
    const { timestamp, coords } = await new Promise<GeolocationPosition>(
      (resolve, reject) =>
        geoLoc.getCurrentPosition(resolve, reject, {
          maximumAge: 5 * 60 * 1000, // 5 minutes
          timeout: 5 * 1000, // 5 seconds
        })
    );

    return {
      timestamp,
      lat: coords.latitude,
      lon: coords.longitude,
      source: "geo",
    };
  }
);
