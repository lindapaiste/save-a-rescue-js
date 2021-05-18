import { SelectProps } from "antd/es/select";
import React from "react";
import { DogOrCat } from "../../../services/species/species";
import { useBreedOptions } from "../../../services/breeds/useBreedOptions";
import { MultiSelect } from "./MultiSelect";

/**
 * need to move breed select into separate component in order to call the useBreedOptions hook conditionally on species
 */
export const MultiSelectBreed = ({
  species,
  ...props
}: SelectProps<string> & { species: DogOrCat }) => {
  const { breeds, isLoading } = useBreedOptions(species);

  return <MultiSelect {...props} options={breeds} loading={isLoading} />;
};
