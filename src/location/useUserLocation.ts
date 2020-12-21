import {ValidUserLocation} from "./types";
import {useSelector} from "../redux/store";
import {getLocation} from "../redux/location";
import {useEstimatedLocation} from "./useIpEstimatedLocation";

export const useUserLocation = (): undefined | ValidUserLocation => {

    const latest = useSelector(state => getLocation(state.location));

    const isLoading = useSelector(state => state.location.ip.isLoading || state.location.geo.isLoading);

    const shouldEstimate = latest === undefined && !isLoading;

    useEstimatedLocation(shouldEstimate);

    return latest;
}
