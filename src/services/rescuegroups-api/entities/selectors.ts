import {
  AnimalPicture,
  MediaFile,
  RgEntityAttributes,
  RgEntityIdentifier,
  RgEntityType,
} from "../schema/attributes";
import { ImageFile, SrcSet } from "../../../components/media/types";
import { DogOrCat } from "../../species/species";
import { RgEntitiesState, RgStateEntity } from "./state";

/**
 * Note: entity selectors are stupidly complicated due to the way that the
 * RescueGroups API handles entity relationships.
 */

/**
 * Get the whole entity object.
 *
 * Note: type assertion is required due to the possibility that T is a union.
 * So there could potentially be a mismatch between attributes and type.
 */
const getEntity = <T extends RgEntityType>(
  state: RgEntitiesState,
  type: T,
  id: string | number
): RgStateEntity<T> => state[type][id] as RgStateEntity<T>;

/**
 * Get the object with all attributes for an entity.
 *
 * This version either returns undefined or complete object, which is easier to guard against.
 */
export const getAttributes =
  <T extends RgEntityType>(type: T) =>
  (id: string | number) =>
  (state: RgEntitiesState): RgEntityAttributes[T] | undefined => {
    return getEntity(state, type, id)?.attributes;
  };

/**
 * This version returns an empty object instead of undefined to allow destructuring.
 */
export const getAllAttributes =
  <T extends RgEntityType>(type: T) =>
  (id: string | number) =>
  (state: RgEntitiesState): Partial<RgEntityAttributes[T]> => {
    return getEntity(state, type, id)?.attributes || {};
  };

/**
 * Get a single attribute for any entity.
 */
export const getAttribute =
  <T extends RgEntityType, K extends keyof RgEntityAttributes[T]>(
    type: T,
    id: string | number,
    property: K
  ) =>
  (state: RgEntitiesState): RgEntityAttributes[T][K] | undefined => {
    return getEntity(state, type, id)?.attributes?.[property];
  };

/**
 * Helper accesses array of ids from object relationships, or returns empty array.
 */
const relationshipHelper = <T extends RgEntityType>(
  object: RgStateEntity<T> | undefined,
  rel: RgEntityType
): string[] => {
  const data: { id: string }[] = object?.relationships?.[rel]?.data || [];
  return data.map((o) => o.id);
};

/**
 * get an array of related entities of a given type for any entity
 */
export const getRelatedIds =
  (type: RgEntityType, id: string | number, rel: RgEntityType) =>
  (state: RgEntitiesState): string[] => {
    return relationshipHelper(state[type][id], rel);
  };

export const getRelationshipsData =
  <T extends RgEntityType>(type: T) =>
  (id: string | number) =>
  (state: RgEntitiesState) =>
    state[type][id]?.relationships;

export const getAnimalAttributes = getAttributes("animals");

export const getImageAttributes = getAttributes("pictures");

export const getBreedName = (id: number | string) => (state: RgEntitiesState) =>
  state.breeds[id]?.attributes.name;

/**
 * want to create selectors that will return data for a given animal id, such as image objects of breed names
 */
const animalSelectorFactory =
  <Selected, Fallback = Selected>(
    helper: (
      animal: RgStateEntity<"animals">,
      state: RgEntitiesState
    ) => Selected,
    fallback: Fallback
  ) =>
  (id: string | number) =>
  (state: RgEntitiesState): Selected | Fallback => {
    const animal = state.animals[id];
    return animal ? helper(animal, state) : fallback;
  };

const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

export const getAnimalBreedNames = animalSelectorFactory((animal, state) => {
  const ids = relationshipHelper(animal, "breeds");
  return ids.map((id) => getBreedName(id)(state)).filter(isDefined);
}, [] as string[]);

export const getAnimalAvatarSrc = animalSelectorFactory((animal, state) => {
  const ids = relationshipHelper(animal, "pictures");
  const id = ids[1] ?? ids[0];
  const picture = id ? getImageAttributes(id)(state) : undefined;
  return picture?.small ? picture.small.url : picture?.original.url;
}, undefined);

export const getAnimalOrgId = animalSelectorFactory((animal) => {
  // relationships are always an array, but there should be only one
  return relationshipHelper(animal, "orgs")[0];
}, undefined);

export const getAnimalSpecies = animalSelectorFactory((animal) => {
  const id = relationshipHelper(animal, "species")[0];
  return id as DogOrCat | undefined;
}, undefined);

export const shouldFetchAnimal = animalSelectorFactory(() => false, true);

export const shouldFetchEntity =
  ({ type, id }: RgEntityIdentifier) =>
  (state: RgEntitiesState) => {
    return !(id in state[type]);
  };

// Note: could do the mapping before storing to optimize performance

const mediaToStandardized = (file: MediaFile): ImageFile => {
  return {
    src: file.url,
    width: file.resolutionX,
    height: file.resolutionY,
  };
};

const pictureToSrcSet = ({ original, large, small }: AnimalPicture): SrcSet => {
  const image = mediaToStandardized(original);
  const sizes = [image];
  if (large) {
    sizes.unshift(mediaToStandardized(large));
  }
  if (small) {
    sizes.unshift(mediaToStandardized(small));
  }
  return {
    ...image,
    files: sizes,
  };
};

export const getAnimalImages = animalSelectorFactory((animal, state) => {
  const ids = relationshipHelper(animal, "pictures");
  return ids
    .map((id) => getImageAttributes(id)(state))
    .filter(isDefined)
    .map(pictureToSrcSet);
}, [] as SrcSet[]);

export const getAnimalPrimaryImage = animalSelectorFactory((animal, state) => {
  const id = relationshipHelper(animal, "pictures")[0];
  const picture = id ? getImageAttributes(id)(state) : undefined;
  return picture ? pictureToSrcSet(picture) : undefined;
}, undefined);
