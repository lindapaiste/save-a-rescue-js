import {useEffect, useState} from "react";
import {nearestFirst, WithDistance} from "./distance";
import {RescueOrg} from "./types";
import {WpClient} from "./WpClient";
import {useGeoLocation} from "../location/useGeoLocation";
import sampleRescues from "../breed-page/breed-rescues.json";
/**
 * TODO: connect to redux
 */

export const useBreedRescues = (slug: string) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>();
    const [rescues, setRescues] = useState<WithDistance<RescueOrg>[]>();

    const {latLon} = useGeoLocation();

    useEffect( () => {
        const doFetch = async () => {
            if ( ! latLon ) {
                return;
            }
            setIsLoading(true);
            setIsError(false);
            try {
                const client = new WpClient();
                const raw = await client.breedRescues(slug);
                //const raw = sampleRescues;
                const sorted = nearestFirst(latLon)(raw);
                setRescues(sorted);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                setIsError(true);
                setError(e);
            }
        }
        doFetch();
    }, [slug, latLon]);

    return {
        isLoading,
        isError,
        error,
        rescues,
    }
}
