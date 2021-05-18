import { createAction } from "@reduxjs/toolkit";
import { LocHistoryItem, LocSource } from "./types";

export { loadGeoLocation } from "../geolocation/loadGeoLocation";
export { loadIpLocation } from "../iplocate/loadIpLocation";

export const receiveZip = createAction(
  "location/zip",
  (zip: string, source: LocSource): { payload: LocHistoryItem } => ({
    payload: {
      zip,
      source,
      timestamp: Date.now(),
    },
  })
);
