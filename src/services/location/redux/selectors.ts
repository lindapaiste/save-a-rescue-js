import { createSelector } from "@reduxjs/toolkit";
import { LatLon } from "../types";
import { LocationState, LocHistoryItem } from "./types";

/**
 * Relation of the location state to the root.
 */
interface RootState {
  location: LocationState;
}

const selectHistory = (state: RootState) => state.location.history;
const selectStatuses = (state: RootState) => state.location.status;
/**
 * Return the latest non-estimated if there is one,
 * or the latest of any type otherwise.
 *
 * Want to ignore ip estimated if there are other types
 * because the estimated is less accurate.
 */
export const selectLocation = createSelector(
  selectHistory,
  // Want the return type to include undefined because the array might be empty
  (history): LocHistoryItem | undefined => {
    const nonEstimated = history.find((loc) => loc.source !== "ip");
    return nonEstimated ?? history[0];
  }
);

/**
 * Need to define the array find callback as a type guard function
 * in order for Typescript to for to know that the found entry
 * must be of this type.
 */
export const isGeoLocation = (
  loc: LocHistoryItem
): loc is LocHistoryItem & LatLon & { source: "geo" } => loc.source === "geo";

/**
 * Return the latest location which comes from geo-location.
 */
export const selectLatestGeo = createSelector(selectHistory, (history) =>
  history.find(isGeoLocation)
);

/**
 * Can select the latest location that matches a given condition.
 * The condition is a type guard, so the returned result is known to match that type.
 *
 * Note: not memoized.
 */
type LocationFilter<Guarded> = (
  loc: LocHistoryItem
) => loc is Guarded & LocHistoryItem;

export const selectMatchingLocation =
  <Guarded>(filter: LocationFilter<Guarded>) =>
  (state: RootState): (Guarded & LocHistoryItem) | undefined =>
    state.location.history.find(filter);

/**
 * Returns true if either ip location or geolocation are loading.
 */
export const selectIsLoadingLocation = createSelector(
  selectStatuses,
  (status) => Object.values(status).some((entry) => entry.isLoading)
);

export const selectGeoStatus = createSelector(
  selectStatuses,
  (status) => status.geo
);

export const selectIpStatus = createSelector(
  selectStatuses,
  (status) => status.ip
);
