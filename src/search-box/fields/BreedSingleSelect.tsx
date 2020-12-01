import React, {useEffect} from "react";
import {DogOrCat} from "../../strings/species";
import {Select} from "antd";
import {useBreeds} from "../../connected/useBreeds";

/**
 * need to request all breeds from API
 * need to distinguish between dog and cat breeds
 * need to ignore all other species breeds
 * need to clear wrong breed selections when species changes
 */

/**
 * Don't show if species is not set.  Can handle higher up or here.
 *
 * use -1 for value instead of undefined to make life easier?
 * handle here, or higher up?
 */
export interface Props {
    value: string;
    setValue: (v: string) => void;
    species: DogOrCat;
}


export const BreedSingleSelect = ({value, setValue, species}: Props) => {

    const {breeds, isLoading} = useBreeds(species);

    /**
     * clear wrong breed selections on species change
     * can do this higher up
     */
    useEffect(() => {
        if (breeds.length && ! inBreedsArray(breeds)(value)) {
            setValue("");
        }
    }, [breeds.length]);

    return (
        <Select
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

export const inBreedsArray = (array: {value: string}[]) => (id: string) => !! array.find( o => o.value === id )
