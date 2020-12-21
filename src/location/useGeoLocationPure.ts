import {useState} from "react";
import {LatLon} from "./types";

/**
 * hook returns a loadLocation() function which can be called as a result of an action or automatically inside of a
 * useEffect
 */
export const useGeoLocationPure = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [latLon, setLocation] = useState<LatLon>();

    const isSupported = !! navigator.geolocation;

    const loadLocation = () => {
        const geoLoc = navigator.geolocation;
        if ( ! geoLoc ) {
            setError("Geolocation is not supported by your browser" );
            return;
        }
        setIsLoading(true);
        geoLoc.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            },
            {
                maximumAge: 5 * 60 * 1000, // 5 minutes
                timeout: 5 * 1000, // 5 seconds
            }
        );
    }

    return {
        loadLocation,
        latLon,
        isLoading,
        error,
        isSupported,
    }
}
