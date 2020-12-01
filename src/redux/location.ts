import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 *
 * WebExtensions that wish to use the Geolocation object must add the "geolocation" permission to their manifest. The
 * user's operating system will prompt the user to allow location access the first time it is requested.
 */

export interface LatLon {
    lat: number;
    lon: number;
}

/**
 * Want to know whether the user has given permission for location, but need to store that as web permissions API is
 * experimental. Do not want to fetch except on explicit button click because this will cause the allow permissions
 * pop-up, which is more likely to be denied if using at the wrong time.
 *
 * Can store zip code from previous searches, but they do need to enter it once.
 */

export interface LocationState {
    isLoading: boolean;
    didAttempt: boolean;
    latLon?: LatLon;
    timestamp?: number;
    error?: string;
    zip?: string;
}

const initialState: LocationState = {
    isLoading: false,
    didAttempt: false,
}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        enterZip: (state, action: PayloadAction<string>) => {
            state.zip = action.payload;
        },
        geoStart: (state) => {
            state.isLoading = true;
            state.didAttempt = true;
        },
        // eslint-disable-next-line no-undef
        geoSuccess: (state, action: PayloadAction<GeolocationPosition>) => {
            const {coords, timestamp} = action.payload;
            delete state.error;
            state.isLoading = false;
            state.didAttempt = true;
            state.timestamp = timestamp;
            state.latLon = {
                lat: coords.latitude,
                lon: coords.longitude
            }
        },
        geoError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        ipSuccess: ( state, action: PayloadAction<Pick<LocationState, 'latLon' | 'zip'>>) => {
            if ( ! state.timestamp ) { //avoid overriding more accurate
                state.latLon = action.payload.latLon;
                state.zip = action.payload.zip;
            }
        }
    }
})
