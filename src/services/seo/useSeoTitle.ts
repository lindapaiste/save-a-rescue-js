import { useEffect } from "react";

/**
 * Core hook alters the title and appends the site name.
 *
 * Could potentially store the original title in state and
 * reset with a useEffect cleanup function,
 * but this is not needed if all pages in the React app
 * set their own title.
 */
export const useSeoTitle = (pageTitle: string): void => {
  const siteName = process.env.REACT_APP_SITE_NAME;
  useEffect(() => {
    document.title = `${pageTitle} - ${siteName}`;
  }, [pageTitle, siteName]);
};
