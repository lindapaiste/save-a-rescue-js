import { createSelector } from "@reduxjs/toolkit";
import { DogOrCat } from "../species/species";
import { RootState } from "../store";
import { BasicOption } from "../../components/search-box/fields/options";
import { requestBreeds } from "./requests";

/**
 * Need to look at both entities and collections to get breed options.
 * Note: Can return name/id or label/value.
 *
 * Want to memoize selectors with createSelector.
 *
 * Need separate selectors for cat and dog breeds,
 * but want to use the same memoized cache every time
 * that dog breeds are requested.
 */
const makeCreateSelector = (species: DogOrCat) =>
  createSelector(
    (state: RootState) => state.entities.breeds,
    (state: RootState) => state.collections.data[requestBreeds[species].key],
    (breeds, collection): BasicOption[] => {
      const ids = collection ? collection.ids.flat() : [];
      return ids.map((id) => ({
        value: id,
        label: breeds[id]?.attributes.name || "",
      }));
    }
  );
/**
 * Don't export the factory, just export the two specific instances.
 *
 * Can get the correct selector for a variable species through the object key.
 */
export const selectBreedOptions = {
  [DogOrCat.CAT]: makeCreateSelector(DogOrCat.CAT),
  [DogOrCat.DOG]: makeCreateSelector(DogOrCat.DOG),
};
