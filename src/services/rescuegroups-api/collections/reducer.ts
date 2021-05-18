/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { loadCollection } from "./load";
import { initialState } from "./state";

export const rgCollectionsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(loadCollection.pending, (state, action) => {
      const { key } = action.meta.arg;
      state.status[key] = {
        status: "pending",
      }; // clears previous error
    })
    .addCase(loadCollection.rejected, (state, action) => {
      const { key } = action.meta.arg;
      state.status[key] = {
        status: "rejected",
        error: action.error.message ?? action.error.name ?? "Error",
      };
    })
    .addCase(loadCollection.fulfilled, (state, action) => {
      const { type, response, key } = action.payload;
      const { meta, data = {} } = response;
      // initialize with empty if needed
      const collection = state.data[key] || {
        type,
        ids: [],
        meta,
      };
      // add ids
      collection.ids[meta.pageReturned - 1] = Object.values(data).map(
        (o) => o.id
      );
      // overwrite meta
      collection.meta = meta;
      state.data[key] = collection;
      state.status[key] = {
        status: "fulfilled",
      };
    })
);
