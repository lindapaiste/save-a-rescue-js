import { useParams } from "react-router-dom";
import { startCase } from "lodash";
import { BreedParams } from "./useBreedTab";
import { useSeoTitle } from "../../services/seo/useSeoTitle";

const toTitle = (tab: string, breedName: string): string => {
  switch (tab.toLowerCase()) {
    case "history":
      return `${breedName} Dog Breed History`;
    case "care":
      return `How to Care for a ${breedName} Puppy or Dog`;
    case "rescues":
      return `${breedName} Puppy & Dog Rescue Organizations`;
    case "facts":
      return `${breedName} Dog Breed Facts`;
    case "adopt":
    default:
      return `Adopt ${breedName} Puppies & Dogs`;
  }
};

export const useBreedSeoTitle = (): void => {
  const { slug, tab = "" } = useParams<BreedParams>();
  const base = toTitle(tab, startCase(slug));
  // TODO: get actual breed name

  useSeoTitle(base);
};
