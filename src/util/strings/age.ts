import {
  isDogOrCat,
  MaybeDogOrCat,
  speciesLabel,
} from "../../services/species/species";
import { AgeGroup, Sex } from "../../services/rescuegroups-api/schema/enums";

export interface AgeObj {
  number: number;
  label: string;
}

/**
 * convert an age string to a number of months or years
 * show months if < 1 year old, years if > 1
 * birthDate looks like: "2012-01-03T00:00:00Z"
 * doesn't need to be extremely accurate - rounding months is ok
 */
export const structuredAge = (birthDate: string): AgeObj => {
  const birth = new Date(birthDate);
  const today = new Date();
  // look at difference in years
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years < 1) {
    return {
      number: months,
      label: "months",
    };
  }
  return {
    number: years,
    label: "years",
  };
};

/**
 * use the species to replace "Baby" with "Puppy/Kitten"
 */
export const ageLabel = (
  ageGroup: string | AgeGroup,
  species?: MaybeDogOrCat
): string => {
  return ageGroup === "Baby"
    ? speciesLabel(species, "youngSingular")
    : ageGroup;
};

/**
 * switches the order around in the case of "Puppy/Kitty", ie. "Adult Male" but "Male Puppy"
 */
export const ageAndSex = (
  ageGroup: string | AgeGroup,
  sex: string | Sex,
  species?: MaybeDogOrCat
): string => {
  if (ageGroup === "Baby" && isDogOrCat(species)) {
    return `${sex} ${speciesLabel(species, "youngSingular")}`;
  }
  return `${ageGroup} ${sex}`;
};
