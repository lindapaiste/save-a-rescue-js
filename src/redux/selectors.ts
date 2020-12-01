import {EntitiesState, StateEntity} from "./entities";
import {AnimalPicture, EntityAttributes, EntityIdentifier, EntityType, MediaFile} from "../client/attributes";
import {SrcSet} from "../single-pet/media/SrcSetImage";
import {Image} from "../single-pet/media/types";
import {breedsKey, DogOrCat} from "../strings/species";
import {State} from "./store";
import {CollectionsState} from "./collections";
import {idsFromCollection} from "./collection-util";
import {BasicOption} from "../search-box/fields/options";

const isDefined = <T>(value: T | undefined): value is T => {
    return value !== undefined;
}

/**
 * get a single attribute for any entity
 */
export const getAttribute = <T extends EntityType, K extends keyof EntityAttributes[T]>(type: T, id: string | number, property: K) =>
    (state: EntitiesState): EntityAttributes[T][K] | undefined => {
        return state[type][id]?.attributes?.[property];
    }

/**
 * get the object with all attributes for an entity
 * return empty object instead of undefined to allow destructuring
 */
export const getAllAttributes = <T extends EntityType>(type: T) => (id: string | number) =>
    (state: EntitiesState): Partial<EntityAttributes[T]> => {
        return state[type][id]?.attributes || {};
    }

/**
 * this version either returns undefined or complete, which is easier to guard against
 */
export const getAttributes = <T extends EntityType>(type: T) => (id: string | number) =>
    (state: EntitiesState): EntityAttributes[T] | undefined => {
        return state[type][id]?.attributes;
    }

/**
 * get an array of related entities of a given type for any entity
 */
export const getRelatedIds = (type: EntityType, id: string | number, rel: EntityType) =>
    (state: EntitiesState): string[] => {
        return relationshipHelper(state[type][id], rel);
    }

export const getRelationshipsData = <T extends EntityType>(type: T) => (id: string | number) => (state: EntitiesState) => state[type][id]?.relationships;

export const getAnimalAttributes = getAttributes('animals');

export const getImageAttributes = getAttributes('pictures');

export const getBreedName = (id: number | string) => (state: EntitiesState) => state.breeds[id]?.attributes.name;

/**
 * helper accesses array of ids from object relationships, or returns empty array
 */
const relationshipHelper = <T extends EntityType>(object: StateEntity<T> | undefined, rel: EntityType): string[] => {
    const data: { id: string }[] = object?.relationships?.[rel]?.data || [];
    return data.map(o => o.id);
}

/**
 * want to create selectors that will return data for a given animal id, such as image objects of breed names
 */
const animalSelectorFactory = <Selected, Fallback = Selected>(helper: (animal: StateEntity<'animals'>, state: EntitiesState) => Selected, fallback: Fallback) =>
    (id: string | number) => (state: EntitiesState): Selected | Fallback => {
        const animal = state.animals[id];
        return animal ? helper(animal, state) : fallback;
    }

export const getAnimalBreedNames = animalSelectorFactory((animal, state) => {
    const ids = relationshipHelper(animal, 'breeds');
    return ids.map(id => getBreedName(id)(state)).filter(isDefined);
}, [] as string[]);

export const getAnimalPrimaryImage = animalSelectorFactory((animal, state) => {
    const id = relationshipHelper(animal, 'pictures')[0];
    const picture = id ? getImageAttributes(id)(state) : undefined;
    return picture ? pictureToSrcSet(picture) : undefined;
}, undefined)

export const getAnimalAvatarSrc = animalSelectorFactory((animal, state) => {
    const ids = relationshipHelper(animal, 'pictures');
    const id = ids[1] ?? ids[0];
    const picture = id ? getImageAttributes(id)(state) : undefined;
    return picture?.small.url;
}, undefined)

export const getAnimalImages = animalSelectorFactory((animal, state) => {
    const ids = relationshipHelper(animal, 'pictures');
    return ids.map(id => getImageAttributes(id)(state)).filter(isDefined).map(pictureToSrcSet);
}, [] as SrcSet[])


export const getAnimalOrgId = animalSelectorFactory((animal) => {
    // relationships are always an array, but there should be only one
    return relationshipHelper(animal, 'orgs')[0];
}, undefined)

export const getAnimalSpecies = animalSelectorFactory((animal) => {
    const id = relationshipHelper(animal, 'species')[0];
    return id as DogOrCat | undefined;
}, undefined);

export const shouldFetchAnimal = animalSelectorFactory(() => false, true);


export const shouldFetchEntity = ({type, id}: EntityIdentifier) => (state: EntitiesState) => {
    return !(id in state[type]);
}

// could do the mapping before storing to optimize performance

const mediaToStandardized = (file: MediaFile): Image => {
    return {
        src: file.url,
        width: file.resolutionX,
        height: file.resolutionY,
    }
}

const pictureToSrcSet = ({original, large, small}: AnimalPicture): SrcSet => {
    const image = mediaToStandardized(original);
    return {
        ...image,
        sizes: [
            mediaToStandardized(small),
            mediaToStandardized(large),
            image
        ]
    }
}

export const getCollectionIds = (key: string) => (state: CollectionsState): string[] | undefined => {
    return idsFromCollection(state[key]);
}

/**
 * can return name/id or label/value
 * needs to look at both entities and collections
 */
export const getAllBreeds = (species: DogOrCat) => (state: State): BasicOption[] => {
    const ids = getCollectionIds(breedsKey(species))(state.collections) || [];
    return ids.map(id => ({
        value: id,
        label: state.entities.breeds[id]?.attributes.name || "",
    }))
}
