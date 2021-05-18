/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { FetchableSource, LocationState, LocHistoryItem } from "./types";

/**
 * Want to minimized duplicated logic between ip and geo.
 *
 * Could use matchers in the reducer to handle multiple actions equally,
 * but would need to extract the key from the action.
 *
 * Instead I am creating a helper that modifies the builder
 * by adding multiple cases at once.
 */

export const applyThunk = (
  builder: ActionReducerMapBuilder<LocationState>,
  key: FetchableSource,
  // eslint-disable-next-line @typescript-eslint/ban-types
  thunk: AsyncThunk<LocHistoryItem, void, {}>
) =>
  builder
    .addCase(thunk.pending, (state) => {
      state.status[key].didAttempt = true;
      state.status[key].isLoading = true;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status[key].isLoading = false;
      state.status[key].error =
        action.error.message ?? action.error.name ?? "Unknown Error";
    })
    .addCase(thunk.fulfilled, (state, action) => {
      // clear previous errors
      delete state.status[key].error;
      // stop loading
      state.status[key].isLoading = false;
      // save the result
      state.history.unshift(action.payload);
    });
