import { ValidUserLocation } from "./types";
import { useSelector } from "../store";
import { useEstimatedLocation } from "./iplocate/useIpEstimatedLocation";
import { selectIsLoadingLocation, selectLocation } from "./redux/selectors";

export const useUserLocation = (): undefined | ValidUserLocation => {
  const latest = useSelector(selectLocation);

  const isLoading = useSelector(selectIsLoadingLocation);

  const shouldEstimate = latest === undefined && !isLoading;

  useEstimatedLocation(shouldEstimate);

  return latest;
};
