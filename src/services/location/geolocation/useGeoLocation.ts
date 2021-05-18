import { useSelector, useDispatch } from "../../store";
import { LatLon } from "../types";
import { selectLatestGeo } from "../redux/selectors";
import { loadGeoLocation } from "../redux/actions";

/**
 * Want to know whether the user has given permission for location, but need to store that as web permissions API is
 * experimental. Do not want to fetch except on explicit button click because this will cause the allow permissions
 * pop-up, which is more likely to be denied if using at the wrong time.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 *
 * WebExtensions that wish to use the Geolocation object must add the "geolocation" permission to their manifest. The
 * user's operating system will prompt the user to allow location access the first time it is requested.
 */

export interface GeoLocationHookReturns {
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
export const useGeoLocation = (): GeoLocationHookReturns => {
  const { didAttempt, isLoading, error } = useSelector(
    (state) => state.location.status.geo
  );
  const location = useSelector(selectLatestGeo);

  const dispatch = useDispatch();

  const geoLoc = navigator.geolocation;

  const isSupported = !!geoLoc;

  const loadLocation = () => {
    dispatch(loadGeoLocation());
  };

  return {
    loadLocation,
    latLon: location,
    timestamp: location?.timestamp,
    isLoading,
    error,
    isSupported,
    didAttempt,
  };
};
