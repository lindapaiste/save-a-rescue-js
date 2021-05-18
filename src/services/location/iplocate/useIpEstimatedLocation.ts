import { useEffect } from "react";
import { loadIpLocation } from "../redux/actions";
import { useDispatch } from "../../store";

/**
 * Hook runs the estimate once automatically,
 * but it can be suppressed with the `shouldLoad` arg.
 * Stores the results to redux.
 */
export const useEstimatedLocation = (shouldLoad = true): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldLoad) {
      dispatch(loadIpLocation());
    }
  }, [dispatch, shouldLoad]);
};
