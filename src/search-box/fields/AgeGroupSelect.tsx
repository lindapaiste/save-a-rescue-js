import {ageGroupValues} from "../../strings/enums";
import {MaybeDogOrCat, speciesLabel} from "../../strings/species";
import {useMemo} from "react";

/**
 * replaces "Baby" with "Puppy"/"Kitten"
 */
export const ageGroupOptions = (species?: MaybeDogOrCat) =>
    ageGroupValues.map(string => ({
        value: string,
        label: string === "Baby" ? speciesLabel(species, 'youngSingular') : string,
    }));

export const useAgeGroupOptions = (species?: MaybeDogOrCat) => useMemo(
    () => ageGroupOptions(species),
    [species]
);

/**
 * potentially want to group baby and young together to help young get adopted?
 */
