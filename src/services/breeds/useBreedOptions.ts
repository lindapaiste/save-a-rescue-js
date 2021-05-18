import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DogOrCat } from "../species/species";
import { useSelector } from "../store";
import { selectBreedOptions } from "./selectors";
import { selectStatusByKey } from "../rescuegroups-api/collections/selectors";
import { requestBreeds } from "./requests";
import { loadCollection } from "../rescuegroups-api/collections/load";

/**
 * Hook to load individual species breed options
 * for use in breed select dropdown.
 */
export const useBreedOptions = (species: DogOrCat) => {
  const request = requestBreeds[species];

  const { status } = useSelector(selectStatusByKey(request.key));

  const isLoading = status === "pending";

  const breeds = useSelector(selectBreedOptions[species]);

  const shouldLoad = !breeds.length && !isLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldLoad) {
      dispatch(loadCollection(request));
    }
  }, [dispatch, shouldLoad, request]);

  return {
    breeds,
    isLoading,
    species,
  };
};
