import { createReducer } from "@reduxjs/toolkit";
import { ApiStatus, LocationState } from "./types";
import { loadGeoLocation, loadIpLocation, receiveZip } from "./actions";
import { applyThunk } from "./thunk";

const initialApiStatus: ApiStatus = {
  isLoading: false,
  didAttempt: false,
};

const initialState: LocationState = {
  history: [],
  status: {
    ip: initialApiStatus,
    geo: initialApiStatus,
  },
};

export const locationReducer = createReducer(initialState, (builder) => {
  builder.addCase(receiveZip, (state, action) => {
    state.history.unshift(action.payload);
  });
  applyThunk(builder, "geo", loadGeoLocation);
  applyThunk(builder, "ip", loadIpLocation);
});
