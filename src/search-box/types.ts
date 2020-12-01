import {AgeGroup, Sex, SizeGroup} from "../strings/enums";
import {FilterLocation} from "../client/request";
import {MaybeDogOrCat} from "../strings/species";
import {BasicOption} from "./fields/options";


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
    pureBreed?: boolean;
    distance?: number;
    location?: FilterLocation;
    sizes: SizeGroup[];
    ages: AgeGroup[];
}

/**
 * need to use onChange instead of setValue in order to work with ant design Form control
 */
export interface EditProps<T, ST = T> {
    value: T;
    onChange: (v: ST) => void;
}
