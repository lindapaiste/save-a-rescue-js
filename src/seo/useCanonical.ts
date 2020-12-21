import {useLocation, useRouteMatch } from "react-router-dom";
import qs from 'qs';
import {useEffect} from "react";
/**
 * either replace the url on an existing tag, or insert a new element into document head
 */
export const setCanonical = (url: string): void => {
    const existing = document.querySelector('link[rel="canonical"]');
    if (existing) {
        (existing as HTMLLinkElement).href = url;
    } else {
        const canonical = document.createElement('link');
        canonical.rel = "canonical"
        canonical.href = url;
        document.head.append(canonical);
    }
}

/**
 * ignore all search arguments except on search pages - where zip and pet stay
 * params aren't actually needed because they are already in url
 * TODO: convert zip to a city/state search
 * what about lat/lon?
 */
export const useCanonical = () => {
    // note: url here is just the path, no domain, https, or www
    //const {path, url, params} = useRouteMatch();

    const {search, pathname} = useLocation();

    useEffect( () => {
        let canonical = "https://savearescue.org" + pathname;

        if ( pathname.match('adoptable-dogs-cats' ) ) {
            const obj = qs.parse(search, { ignoreQueryPrefix: true });
            const {pet, zip} = obj;
            canonical += qs.stringify({pet, zip}, { addQueryPrefix: true });
        }

        //alert("canonical " + canonical);

        setCanonical(canonical);

    }, [search, pathname]);
}

