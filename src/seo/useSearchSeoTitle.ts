import {DogOrCat, isDogOrCat, MaybeDogOrCat, speciesLabel} from "../strings/species";

//TODO: translate location into city & state

export interface FromUrl {
    zip?: string;
    species?: MaybeDogOrCat;
}

export const useSearchSeoTitle = ({species, zip}: FromUrl): void => {
    const speciesString = (species?: MaybeDogOrCat): string => {
        return `${speciesLabel(species, 'youngPlural')} & ${speciesLabel(species, 'plural')}`;
    }
    const animalText = isDogOrCat(species) ? speciesString(species) : `${speciesString(DogOrCat.DOG)}, ${speciesString(DogOrCat.CAT)}`;
    const locText = zip ? `in ${zip}` : '';
    document.title = `Adoptable ${animalText} ${locText} - SaveARescue.org`;
}
