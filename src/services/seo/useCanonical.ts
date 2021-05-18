import { useLocation } from "react-router-dom";
import qs from "qs";
import { useEffect } from "react";
import { PATHS } from "../routing/paths";

/**
 * Either replace the url of an existing tag, or insert a new element into document head
 */
const setCanonical = (url: string): void => {
  const existing = document.querySelector('link[rel="canonical"]');
  if (existing) {
    (existing as HTMLLinkElement).href = url;
  } else {
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = url;
    document.head.append(canonical);
  }
};

/**
 * ignore all search arguments except on search pages - where zip and pet stay
 * params aren't actually needed because they are already in url
 * TODO: convert zip or lat/lon to a city/state search
 */
const useCanonical = () => {
  const { search, pathname } = useLocation();

  useEffect(() => {
    let canonical = (process.env.REACT_APP_BASE_URL ?? "") + pathname;

    if (pathname.match(PATHS.search())) {
      const obj = qs.parse(search, { ignoreQueryPrefix: true });
      const { pet, zip } = obj;
      canonical += qs.stringify({ pet, zip }, { addQueryPrefix: true });
    }

    setCanonical(canonical);
  }, [search, pathname]);
};

export const CallCanonical = () => {
  useCanonical();
  return null;
};
