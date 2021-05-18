import { Nullable } from "@lindapaiste/ts-helpers";
import { Species } from "../rescuegroups-api/schema/attributes";

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

type SpeciesSlug = "dogs" | "cats";

export const isDogOrCat = (val: unknown): val is DogOrCat => {
  return Object.values(DogOrCat).includes(val as never);
};

export const isDog = (val: unknown): val is DogOrCat.DOG => {
  return val === DogOrCat.DOG;
};

export const isCat = (val: unknown): val is DogOrCat.CAT => {
  return val === DogOrCat.CAT;
};

export const isEither = (val: unknown): val is EitherVal => {
  return val === EITHER_VAL;
};

export const normalizeSpecies = (val: unknown): MaybeDogOrCat => {
  return isDogOrCat(val) ? val : EITHER_VAL;
};

type EmptyFormat = "pet" | "or" | "and";

const labels: Record<DogOrCat | EmptyFormat, Species> = {
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
  pet: {
    plural: "Pets",
    singular: "Pet",
    youngPlural: "Babies",
    youngSingular: "Baby",
  },
  or: {
    plural: "Dogs or Cats",
    singular: "Dog or Cat",
    youngPlural: "Puppies or Kittens",
    youngSingular: "Puppy or Kitten",
  },
  and: {
    plural: "Dogs and Cats",
    singular: "Dog and Cat", // ??
    youngPlural: "Puppies and Kittens",
    youngSingular: "Puppy and Kitten", // ??
  },
};

/**
 * boolean argument allows switching between formats "Pet" vs "Dog or Cat" when empty
 */
export const speciesLabel = (
  species: MaybeDogOrCat | undefined,
  label: keyof Species,
  emptyFormat: EmptyFormat = "pet"
): string => {
  const key = isDogOrCat(species) ? species : emptyFormat;
  return labels[key][label];
};

export function slugToId(slug: SpeciesSlug): DogOrCat;
export function slugToId(slug: null | undefined): EitherVal;
export function slugToId(slug: Nullable<string>): MaybeDogOrCat;
export function slugToId(slug: Nullable<string>): MaybeDogOrCat {
  switch (slug) {
    case "cats":
      return DogOrCat.CAT;
    case "dogs":
      return DogOrCat.DOG;
    default:
      return EITHER_VAL;
  }
}

// if id extends DogOrCat then won't be undefined
export function idToSlug(id: DogOrCat): SpeciesSlug;
export function idToSlug(id: null | undefined | EitherVal): undefined;
export function idToSlug(id: Nullable<string>): SpeciesSlug | undefined;
export function idToSlug(id: Nullable<string>): SpeciesSlug | undefined {
  switch (id) {
    case DogOrCat.CAT:
      return "cats";
    case DogOrCat.DOG:
      return "dogs";
    default:
      return undefined;
  }
}
