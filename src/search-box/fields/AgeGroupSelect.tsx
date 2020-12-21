import {ageGroupValues} from "../../strings/enums";
import {MaybeDogOrCat, speciesLabel} from "../../strings/species";
import {useMemo} from "react";
import {ageLabel} from "../../strings/age";


/**
 * replaces "Baby" with "Puppy"/"Kitten"
 */
export const ageGroupOptions = (species?: MaybeDogOrCat) =>
    ageGroupValues.map(string => ({
        value: string,
        label: ageLabel(string, species)
    }));

export const useAgeGroupOptions = (species?: MaybeDogOrCat) => useMemo(
    () => ageGroupOptions(species),
    [species]
);

/**
 * potentially want to group baby and young together to help young get adopted?
 */
