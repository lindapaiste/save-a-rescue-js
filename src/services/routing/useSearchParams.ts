import qs from "qs";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { SearchFormState } from "../../components/search-box/types";
import { idToSlug, isDogOrCat, slugToId } from "../species/species";
import {
  extractLocation,
  hasLocation,
} from "../location/formatting/validation";
import { isUnlimited } from "../../components/search-box/fields/DistanceSelect";

/**
 * just change species and location -- everything else is fine
 */
interface MappedUrl {
  pet?: string;
  zip?: string;
  lat?: number;
  lon?: number;
}
type MappedSearch = Pick<Partial<SearchFormState>, "location" | "species">;

export type URLSearchFormState = Omit<
  Partial<SearchFormState>,
  keyof MappedSearch
> &
  MappedUrl;

/**
 * most values stay the same, but I want to drop empties
 * qs can drop empty arrays, but not when using arrayFormat=comma
 * 12/4/2020 - not using comma array format because it becomes impossible for qs to know that it is an array at decode time
 */
const mapToUrl = (state: Partial<SearchFormState>): URLSearchFormState => {
  const { location, species, distance, ...rest } = state;
  const mappedLoc = extractLocation(location);
  return {
    ...rest,
    ...mappedLoc,
    pet: idToSlug(species),
    distance: isUnlimited(distance) ? undefined : distance,
  };
};

const mapToForm = (state: URLSearchFormState): Partial<SearchFormState> => {
  const { zip, lat, lon, pet, ...rest } = state;
  const loc = { zip, lon, lat };
  const species = slugToId(pet);
  return {
    ...rest,
    species: isDogOrCat(species) ? species : undefined,
    location: hasLocation(loc) ? loc : undefined,
  };
};

export const searchToState = (search: string): Partial<SearchFormState> => {
  const object = qs.parse(search, { ignoreQueryPrefix: true }); // comma: true
  return mapToForm(object);
};

export const stateToSearch = (state: Partial<SearchFormState>): string => {
  return qs.stringify(mapToUrl(state), { skipNulls: true }); // arrayFormat: 'comma'
};

export const useSearchParams = (): Partial<SearchFormState> => {
  const { search } = useLocation();

  return useMemo(() => {
    return searchToState(search);
  }, [search]);
};
