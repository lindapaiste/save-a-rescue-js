import { FilterLocation } from "../rescuegroups-api/schema/request";
import { isCat, isDog } from "../species/species";
import { SearchFormState } from "../../components/search-box/types";
import { BasicOption } from "../../components/search-box/fields/options";

export const getBreed = ({
  breedCats = [],
  breedDogs = [],
  species,
}: Partial<SearchFormState>): (string | BasicOption)[] => {
  // eslint-disable-next-line no-nested-ternary
  return isDog(species) ? breedDogs : isCat(species) ? breedCats : [];
};

export const breedsToIds = (breeds: (string | BasicOption)[]): string[] => {
  return breeds.map((o) => (typeof o === "string" ? o : o.value));
};

export const locString = (location: FilterLocation): string => {
  if ("postalcode" in location) {
    return location.postalcode.toString();
  }
  if ("coordinates" in location) {
    return location.coordinates;
  }
  return `${location.lat},${location.lon}`;
};
