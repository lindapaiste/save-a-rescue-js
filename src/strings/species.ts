import {Species} from "../clientRg/attributes";
import {Nullable} from "@lindapaiste/ts-helpers";

export enum DogOrCat {
    CAT = "3",
    DOG = "8",
}
export const EITHER_VAL = "-1";

type EitherVal = typeof EITHER_VAL;

export type MaybeDogOrCat = EitherVal | DogOrCat;

export interface PropSpecies {
    species?: MaybeDogOrCat;
}

export type SpeciesSlug = 'dogs' | 'cats';

export const normalizeSpecies = (val: any): MaybeDogOrCat => {
    return isDogOrCat(val) ? val : EITHER_VAL;
}

/**
 * doesn't matter which path I use as long as I consistently get the string from the same function
 */
export const breedsKey = (species: DogOrCat): string => {
    return `/animals/species/${species}/breeds`;
}

export const isDogOrCat = (val: any): val is DogOrCat => {
    return Object.values(DogOrCat).includes(val);
}

export const isDog = (val: any): val is DogOrCat.DOG => {
    return val === DogOrCat.DOG;
}

export const isCat = (val: any): val is DogOrCat.CAT => {
    return val === DogOrCat.CAT;
}

export const isEither = (val: any): val is EitherVal => {
    return val === EITHER_VAL;
}

const labels: Record<MaybeDogOrCat, Species> = {
    3: {
        plural: "Cats",
        singular: "Cat",
        youngPlural: "Kittens",
        youngSingular: "Kitten",
    },
    8: {
        plural: "Dogs",
        singular: "Dog",
        youngPlural: "Puppies",
        youngSingular: "Puppy",
    },
    "-1": {
        plural: "Pets",
        singular: "Pet",
        youngPlural: "Babies",
        youngSingular: "Baby",
    }
}

export const speciesLabel = (species: MaybeDogOrCat | undefined, label: keyof Species): string => {
    if ( isDogOrCat(species) ) {
        return labels[species][label];
    } else {
        return labels[EITHER_VAL][label];
    }
}

export function slugToId (slug: SpeciesSlug): DogOrCat
export function slugToId (slug: null | undefined): EitherVal
export function slugToId (slug: Nullable<string>): MaybeDogOrCat
export function slugToId (slug: Nullable<string>): MaybeDogOrCat {
    switch (slug) {
        case "cats":
            return DogOrCat.CAT;
        case "dogs":
            return DogOrCat.DOG;
        default:
            return EITHER_VAL;
    }
}

//if id extends DogOrCat then won't be undefined
export function idToSlug (id: DogOrCat ): SpeciesSlug
export function idToSlug (id: null | undefined | EitherVal ): undefined
export function idToSlug (id: Nullable<string>): SpeciesSlug | undefined
export function idToSlug (id: Nullable<string>): SpeciesSlug | undefined {
    switch (id) {
        case DogOrCat.CAT:
            return "cats";
        case DogOrCat.DOG:
            return "dogs";
        default:
            return undefined;
    }
}
