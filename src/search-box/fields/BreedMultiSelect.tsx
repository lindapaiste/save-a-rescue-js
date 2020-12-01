import React, {useEffect} from "react";
import {DogOrCat} from "../../strings/species";
import {Select} from "antd";
import {useBreeds} from "../../connected/useBreeds";
import {inBreedsArray} from "./BreedSingleSelect";

const {Option, OptGroup} = Select;

/**
 * need to request all breeds from API
 * need to distinguish between dog and cat breeds
 * need to ignore all other species breeds
 * need to clear wrong breed selections when species changes
 */

export interface Props {
    value: string[];
    setValue: (v: string[]) => void;
    species: DogOrCat;
}

export const BreedMultiSelect = ({value, setValue, species}: Props) => {

    const {breeds, isLoading} = useBreeds(species);

    /**
     * clear wrong species selections on species change
     */
    useEffect(() => {
        if ( breeds.length) {
            setValue(value.filter(inBreedsArray(breeds)))
        }
    }, [species]);

    return (
        <Select
            mode="tags"
            style={{
                minWidth: 150,
            }}
            value={value}
            onChange={setValue}
            options={breeds}
            placeholder="Any Breed"
        />
    )
}
