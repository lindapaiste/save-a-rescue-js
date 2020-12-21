import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchIpLocation} from "./fetchIpLocation";
import {flatActions} from "../redux/store";
import {hasLocation} from "./validation";
import {extractMessage} from "../loading/FetchError";

/**
 * run estimate once automatically (suppressible with `shouldLoad` arg) and store to redux
 */
export const useEstimatedLocation = (shouldLoad: boolean = true): void => {

    const dispatch = useDispatch();

    useEffect(() => {

        const sendError = (error: string): void => {
            dispatch(flatActions.error({
                source: 'ip',
                timestamp: Date.now(),
                error
            }));
        }

        const estimate = async () => {
            try {
                dispatch(flatActions.start({source: 'ip'}));
                const location = await fetchIpLocation();
                if (hasLocation(location)) {
                    dispatch(flatActions.success({
                        source: 'ip',
                        timestamp: Date.now(),
                        ...location
                    }));
                } else {
                    sendError('API result did not contain a valid location');
                }
            } catch (e) {
                sendError(extractMessage(e) ?? 'Unknown Error');
            }
        }

        if (shouldLoad) {
            estimate();
        }

    },
        [dispatch, shouldLoad]
    );
}
