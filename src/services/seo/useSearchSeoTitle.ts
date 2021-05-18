import { first } from "lodash";
import { isNonNullable } from "@lindapaiste/ts-helpers";
import { SearchFormState } from "../../components/search-box/types";
import { MaybeDogOrCat, speciesLabel } from "../species/species";
import { AgeGroup, Sex, SizeGroup } from "../rescuegroups-api/schema/enums";
import { getBreed } from "../search/searchArgHandling";
import { useSelector } from "../store";
import { getAttribute } from "../rescuegroups-api/entities/selectors";
import { useCityState } from "../location/useCityState";
import { useSeoTitle } from "./useSeoTitle";

/**
 * if selecting more than one of anything, drop the additional and use just the first for the canonical and the title
 */
export interface TitleProps {
  species?: MaybeDogOrCat;
  sex?: Sex;
  breed?: string;
  cityState?: string;
  size?: SizeGroup;
  age?: AgeGroup;
}

/**
 * special handling:
 * - no species becomes "Cat or Dog"
 * - "Baby" or "Young" gets dropped from age and instead changes species to "Kitten"/"Puppy"

 * formula: `Adopt a ${size} ${age} ${sex} ${breed} ${species} ${location}`
 */
export const makeTitleString = ({
  species,
  sex,
  breed,
  cityState,
  size,
  age,
}: TitleProps): string => {
  const isPuppy = age === "Baby" || age === "Young";
  const pieces = [
    "Adopt a",
    size,
    isPuppy ? undefined : age,
    sex,
    breed,
    speciesLabel(species, isPuppy ? "youngSingular" : "singular", "or"),
    cityState === undefined ? "Near You" : `in ${cityState}`,
  ];

  return pieces.filter(isNonNullable).join(" ");
};

const useTitleString = (state: Partial<SearchFormState>): string => {
  const { sizes, sex, location, ages, species } = state;

  const breed = first(getBreed(state));

  const breedName = useSelector((rootState) => {
    if (breed === undefined) {
      return undefined;
    }
    return typeof breed === "string"
      ? getAttribute("breeds", breed, "name")(rootState.entities)
      : breed.label;
  });

  const cityState = useCityState(location || {});

  return makeTitleString({
    size: first(sizes),
    age: first(ages),
    sex: sex?.length === 1 ? sex[0] : undefined,
    breed: breedName,
    species,
    cityState,
  });
};

export const useSearchSeoTitle = (state: Partial<SearchFormState>) => {
  const string = useTitleString(state);
  useSeoTitle(string);
};
