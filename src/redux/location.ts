import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LatLon, ValidUserLocation} from "../location/types";

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 *
 * WebExtensions that wish to use the Geolocation object must add the "geolocation" permission to their manifest. The
 * user's operating system will prompt the user to allow location access the first time it is requested.
 *
 * Want to know whether the user has given permission for location, but need to store that as web permissions API is
 * experimental. Do not want to fetch except on explicit button click because this will cause the allow permissions
 * pop-up, which is more likely to be denied if using at the wrong time.
 *
 * Can store zip code from previous searches, but they do need to enter it once.
 */

export interface ApiStatus {
    isLoading: boolean;
    didAttempt: boolean;
    error?: string;
}

export type LocSource = 'input' | 'geo' | 'ip' | 'url';

interface SourceTimestamp {
    timestamp: number;
    source: LocSource;
}

type LocHistoryItem = ValidUserLocation & SourceTimestamp;

export interface LocationState {
    history: LocHistoryItem[];
    ip: ApiStatus;
    geo: ApiStatus;
}

type FetchableSource = Extract<LocSource, keyof LocationState> // is just 'ip' | 'geo', but now is abstracted

type StartPayload = {source: FetchableSource};
type ErrorPayload = SourceTimestamp & StartPayload & {
    error: string;
}
type SuccessPayload = StartPayload & LocHistoryItem;
type ZipPayload = SourceTimestamp & {
    zip: string;
}

const initialApiStatus: ApiStatus = {
    isLoading: false,
    didAttempt: false,
}

const initialState: LocationState = {
    history: [],
    ip: initialApiStatus,
    geo: initialApiStatus
}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        start: (state, action: PayloadAction<StartPayload>) => {
            state[action.payload.source].isLoading = true;
            state[action.payload.source].didAttempt = true;
        },
        error: (state, action: PayloadAction<ErrorPayload>) => {
            state[action.payload.source].isLoading = false;
            state[action.payload.source].didAttempt = true;
            state[action.payload.source].error = action.payload.error;
        },
        success: (state, action: PayloadAction<SuccessPayload>) => {
            delete state[action.payload.source].error;
            state[action.payload.source].isLoading = false;
            state[action.payload.source].didAttempt = true;
            state.history.unshift(action.payload);
        },
        enterZip: (state, action: PayloadAction<ZipPayload>) => {
            state.history.unshift(action.payload);
        },
    }
})

// want to ignore ip estimated if there is any other type, because the estimated is less accurate
export const getLocation = (state: LocationState): LocHistoryItem | undefined => {
    return latestNonEstimated(state) ?? latest(state);
}

const latest = (state: LocationState): LocHistoryItem | undefined => {
    return state.history[0];
}

const latestNonEstimated = (state: LocationState): LocHistoryItem | undefined => {
    return state.history.find( loc => loc.source !== 'ip' );
}

export const latestGeo = (state: LocationState): LocHistoryItem & LatLon & {source: 'geo'} | undefined => {
    return state.history.find( loc => loc.source === 'geo' ) as any;
}

type LocationFilter<Guarded> = (loc: LocHistoryItem) => loc is Guarded & LocHistoryItem;

export const latestLocation = <Guarded>(state: LocationState, filter: LocationFilter<Guarded> ): Guarded & LocHistoryItem | undefined => {
    return state.history.find( filter );
}
