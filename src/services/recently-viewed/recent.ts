/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location as HistoryLocation } from "history";

/**
 * Save recently viewed pets - just an array of pet ids.
 *
 * Save the last performed search - all information is now
 * stored in the URL, so just need to store a single string.
 * but should store path as well for compatibility with future breed searching.
 */

export interface RecentState {
  viewed: string[];
  searched?: HistoryLocation;
}

const initialState: RecentState = { viewed: [] };

const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    /**
     * Action creator just requires the pet id.
     */
    viewedPet: (state, action: PayloadAction<string>) => {
      /**
       * add new views to the front of the array, and make sure they aren't present twice.
       */
      state.viewed = [
        action.payload,
        ...state.viewed.filter((id) => id !== action.payload),
      ];
    },
    /**
     * Pass the location object from react-router.
     */
    didSearch: (state, action: PayloadAction<HistoryLocation>) => {
      state.searched = action.payload;
    },
  },
});

export const { viewedPet, didSearch } = recentSlice.actions;
export const recentReducer = recentSlice.reducer;

export const selectRecentlyViewed = (state: {
  recent: RecentState;
}): string[] => state.recent.viewed;

export const selectLastSearch = (state: {
  recent: RecentState;
}): HistoryLocation | undefined => state.recent.searched;
