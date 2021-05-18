import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocationState, LocHistoryItem } from "../redux/types";
import { fetchIpLocation } from "./ipLocate";
import { selectIpStatus } from "../redux/selectors";

/**
 * Async thunk action to estimate the user's location
 * based on their IP address.
 */
export const loadIpLocation = createAsyncThunk(
  "location/ip/load",
  async (): Promise<LocHistoryItem> => {
    const location = await fetchIpLocation();
    return {
      ...location,
      timestamp: Date.now(),
      source: "ip",
    };
  },
  {
    /**
     * Cancel condition prevents multiple simultaneous requests,
     * for example from cat and dog widgets on the same page.
     */
    condition: (_, { getState }): boolean | undefined => {
      const { isLoading } = selectIpStatus(
        getState() as { location: LocationState }
      );
      return isLoading ? false : undefined;
    },
  }
);
