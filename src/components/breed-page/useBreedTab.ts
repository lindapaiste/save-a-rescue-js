import { useHistory, useParams } from "react-router-dom";

/**
 * sync the active tab to the url
 */

export interface BreedParams {
  slug: string;
  tab?: string;
}

interface Returns {
  activeTab?: string;
  onChange?: (tab: string) => void;
}

export const breedMain = (slug = "dalmatian"): string => `/breed/${slug}`;

export const breedTab = (slug = "dalmatian", tab?: string): string =>
  tab ? `/breed/${slug}/${tab}` : breedMain(slug);

export const useBreedTab = (): Returns => {
  const { slug, tab = "" } = useParams<BreedParams>();
  const history = useHistory();
  return {
    activeTab: tab,
    onChange: (newTab) => {
      history.push(breedTab(slug, newTab));
    },
  };
};
