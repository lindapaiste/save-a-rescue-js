import { DogOrCat } from "../species/species";
import { RgRequest } from "../rescuegroups-api/client/RgRequest";
/**
 * Note: there are multiple ways to get the species breeds.
 * It doesn't matter which path I use as long as I consistently
 * get the string from the same function.
 */
const breedsPath = (species: DogOrCat): string => {
  return `/animals/species/${species}/breeds`;
};

/**
 * Breeds endpoint only supports GET method, so cannot use data property to filter.
 * Must instead use views, which means dog and cat breeds need to be fetched separately.
 */
const createBreedsRequest = (species: DogOrCat) => {
  const url = breedsPath(species);
  return new RgRequest("breeds", url)
    .setMaxLimit()
    .setSort("breeds", "name", "ASC")
    .raw();
};

export const requestBreeds = {
  [DogOrCat.CAT]: createBreedsRequest(DogOrCat.CAT),
  [DogOrCat.DOG]: createBreedsRequest(DogOrCat.DOG),
};
