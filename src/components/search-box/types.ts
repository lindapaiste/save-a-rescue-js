import {
  AgeGroup,
  Sex,
  SizeGroup,
} from "../../services/rescuegroups-api/schema/enums";
import { MaybeDogOrCat } from "../../services/species/species";
import { BasicOption } from "./fields/options";
import { ValidUserLocation } from "../../services/location/types";

export enum SearchSort {
  NEWEST,
  NEAREST,
}

/**
 * age and size checkbox sections map to a single property
 *
 * qualities and good with map to many
 *
 * want to store a search box state that is separate from the complicated filters schema, then map to filters later
 *
 * should not show declawed when dog is selected as species
 */
export interface SearchFormState {
  species: MaybeDogOrCat;
  sex: Sex[];
  breedCats: (string | BasicOption)[];
  breedDogs: (string | BasicOption)[];
  breed?: never;
  pureBreed?: boolean;
  distance?: number | string;
  location?: ValidUserLocation;
  sizes: SizeGroup[];
  ages: AgeGroup[];
  org?: string;
  sort?: SearchSort;
  hasPic?: boolean;
}

/**
 * need to use onChange instead of setValue in order to work with ant design Form control
 */
export interface EditProps<T, ST = T> {
  value: T;
  onChange: (v: ST) => void;
}
