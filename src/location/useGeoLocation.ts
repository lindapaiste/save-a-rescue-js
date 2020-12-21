import {flatActions, useSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {latestGeo} from "../redux/location";
import {LatLon} from "./types";

export interface GeoLocation {
    loadLocation: () => void;
    latLon?: LatLon;
    isLoading: boolean;
    error?: string;
    isSupported: boolean;
    timestamp?: number;
    didAttempt: boolean;
}

/**
 * hook returns a loadLocation() function which can be called as a result of an action or automatically inside of a
 * useEffect, but it's better to call it as a result of a button click
 */
export const useGeoLocation = (): GeoLocation => {

    const {didAttempt, isLoading, error} = useSelector(state => state.location.geo);
    const location = useSelector(state => latestGeo(state.location));

    const dispatch = useDispatch();

    const geoLoc = navigator.geolocation;

    const isSupported = !!geoLoc;

    const sendError = (error: string): void => {
        dispatch(flatActions.error({
            source: 'geo',
            timestamp: Date.now(),
            error
        }));
    }

    // eslint-disable-next-line no-undef
    const sendSuccess = (position: GeolocationPosition): void => {
        dispatch(flatActions.success({
            source: 'geo',
            timestamp: position.timestamp,
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }))
    }

    const loadLocation = () => {
        if (!geoLoc) {
            sendError("Geolocation is not supported by your browser");
            return;
        }
        dispatch(flatActions.start({source: 'geo'}));
        geoLoc.getCurrentPosition(
            (position) => {
                sendSuccess(position);
            },
            (error) => {
                sendError(error.message);
            },
            {
                maximumAge: 5 * 60 * 1000, // 5 minutes
                timeout: 5 * 1000, // 5 seconds
            }
        );
    }

    return {
        loadLocation,
        latLon: location,
        timestamp: location?.timestamp,
        isLoading,
        error,
        isSupported,
        didAttempt,
    }
}

