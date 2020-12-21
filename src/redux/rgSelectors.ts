import {RgEntitiesState, StateEntity} from "./rgEntities";
import {AnimalPicture, RgEntityAttributes, RgEntityIdentifier, RgEntityType, MediaFile} from "../clientRg/attributes";
import {SrcSet} from "../media/SrcSetImage";
import {ImageFile} from "../media/types";
import {breedsKey, DogOrCat} from "../strings/species";
import {State} from "./store";
import {RgCollectionsState} from "./rgCollections";
import {idsFromCollection} from "./collection-util";
import {BasicOption} from "../search-box/fields/options";

const isDefined = <T>(value: T | undefined): value is T => {
    return value !== undefined;
}

/**
 * get a single attribute for any entity
 */
export const getAttribute = <T extends RgEntityType, K extends keyof RgEntityAttributes[T]>(type: T, id: string | number, property: K) =>
    (state: RgEntitiesState): RgEntityAttributes[T][K] | undefined => {
        return state[type][id]?.attributes?.[property];
    }

/**
 * get the object with all attributes for an entity
 * return empty object instead of undefined to allow destructuring
 */
export const getAllAttributes = <T extends RgEntityType>(type: T) => (id: string | number) =>
    (state: RgEntitiesState): Partial<RgEntityAttributes[T]> => {
        return state[type][id]?.attributes || {};
    }

/**
 * this version either returns undefined or complete, which is easier to guard against
 */
export const getAttributes = <T extends RgEntityType>(type: T) => (id: string | number) =>
    (state: RgEntitiesState): RgEntityAttributes[T] | undefined => {
        return state[type][id]?.attributes;
    }

/**
 * get an array of related entities of a given type for any entity
 */
export const getRelatedIds = (type: RgEntityType, id: string | number, rel: RgEntityType) =>
    (state: RgEntitiesState): string[] => {
        return relationshipHelper(state[type][id], rel);
    }

export const getRelationshipsData = <T extends RgEntityType>(type: T) => (id: string | number) => (state: RgEntitiesState) => state[type][id]?.relationships;

export const getAnimalAttributes = getAttributes('animals');

export const getImageAttributes = getAttributes('pictures');

export const getBreedName = (id: number | string) => (state: RgEntitiesState) => state.breeds[id]?.attributes.name;

/**
 * helper accesses array of ids from object relationships, or returns empty array
 */
const relationshipHelper = <T extends RgEntityType>(object: StateEntity<T> | undefined, rel: RgEntityType): string[] => {
    const data: { id: string }[] = object?.relationships?.[rel]?.data || [];
    return data.map(o => o.id);
}

/**
 * want to create selectors that will return data for a given animal id, such as image objects of breed names
 */
const animalSelectorFactory = <Selected, Fallback = Selected>(helper: (animal: StateEntity<'animals'>, state: RgEntitiesState) => Selected, fallback: Fallback) =>
    (id: string | number) => (state: RgEntitiesState): Selected | Fallback => {
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
    return picture?.small ? picture.small.url : picture?.original.url;
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


export const shouldFetchEntity = ({type, id}: RgEntityIdentifier) => (state: RgEntitiesState) => {
    return !(id in state[type]);
}

// could do the mapping before storing to optimize performance

const mediaToStandardized = (file: MediaFile): ImageFile => {
    return {
        src: file.url,
        width: file.resolutionX,
        height: file.resolutionY,
    }
}

const pictureToSrcSet = ({original, large, small}: AnimalPicture): SrcSet => {
    const image = mediaToStandardized(original);
    let sizes = [image];
    if (large) {
        sizes.unshift(mediaToStandardized(large));
    }
    if ( small ) {
        sizes.unshift(mediaToStandardized(small));
    }
    return {
        ...image,
        files: sizes,
    }
}

export const getCollectionIds = (key: string) => (state: RgCollectionsState): string[] | undefined => {
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
