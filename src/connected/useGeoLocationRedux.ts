import {actions, useSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {LatLon, locationSlice} from "../redux/location";
import {fetchIpLocation} from "./fetchIpLocation";
import {useEffect} from "react";

export interface GeoLocation {
    loadLocation: () => void;
    //estimate: () => void;
    latLon?: LatLon;
    isLoading: boolean;
    error?: string;
    isSupported: boolean;
    zip?: string;
    timestamp?: number;
    didAttempt: boolean;
    setZip: (zip: string) => void;
}

/**
 * hook returns a loadLocation() function which can be called as a result of an action or automatically inside of a
 * useEffect, but it's better to call it as a result of a button click
 */
export const useGeoLocation = (): GeoLocation => {

    const {didAttempt, isLoading, latLon, timestamp, error, zip} = useSelector(state => state.location);

    const dispatch = useDispatch();

    const isSupported = !!navigator.geolocation;

    const loadLocation = () => {
        const geoLoc = navigator.geolocation;
        if (!geoLoc) {
            dispatch(actions.geoError("Geolocation is not supported by your browser"));
            return;
        }
        dispatch(actions.geoStart());
        geoLoc.getCurrentPosition(
            (position) => {
                dispatch(actions.geoSuccess(position));
            },
            (error) => {
                dispatch(actions.geoError(error.message));
            },
            {
                maximumAge: 5 * 60 * 1000, // 5 minutes
                timeout: 5 * 1000, // 5 seconds
            }
        );
    }

    const shouldEstimate = !zip && !latLon && !isLoading;

    useEstimatedLocation(shouldEstimate);

    // console.log({zip, latLon, isLoading, shouldEstimate});

    const setZip = (zip: string) => {
        dispatch(locationSlice.actions.enterZip(zip))
    }

    return {
        loadLocation,
        latLon,
        isLoading,
        error,
        isSupported,
        zip,
        timestamp,
        didAttempt,
        setZip,
    }
}

export const useEstimatedLocation = (shouldLoad: boolean = true) => {

    const dispatch = useDispatch();

    /**
     * run estimate once automatically
     */
    useEffect( () => {
        const estimate = async () => {
            try {
                const payload = await fetchIpLocation();
                dispatch(actions.ipSuccess(payload));
            } catch (e) {
                //
            }
        }
        if ( shouldLoad ) {
            estimate();
        }
    }, [dispatch, shouldLoad]);
}
