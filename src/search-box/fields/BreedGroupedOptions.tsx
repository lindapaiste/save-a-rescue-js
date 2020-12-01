import React from "react";
import {Select} from "antd";
const {Option, OptGroup} = Select;

/**
 * look into rc-select OptionGroupData - should be allowed by antd
 * https://github.com/react-component/select/blob/f05d79454720d83afd93cd6667b351c5bad37b24/src/interface/index.ts
 */

type BasicOption = { value: string, label: string }
/**
 * could share some logic with Checkbox options
 */
export const RenderOptions = ({options}: { options: BasicOption[] }) => {
    return (
        <>
            {options.map(({value, label}) => (
                <Option value={value}>{label}</Option>
            ))}
        </>
    )
}
export const RenderGrouped = ({catBreeds, dogBreeds}: { catBreeds: BasicOption[], dogBreeds: BasicOption[] }) => {
    return (
        <>
            <OptGroup label="Dogs">
                <RenderOptions options={dogBreeds}/>
            </OptGroup>
            <OptGroup label="Cats">
                <RenderOptions options={catBreeds}/>
            </OptGroup>
        </>
    )
}

/*
    const cat = useBreeds(DogOrCat.CAT);

    const dog = useBreeds(DogOrCat.DOG);

    // can make this cleaner with better typings
    const isDogBreed = (id: number | string) => {
        return !!dog.breeds.find(o => isSameId(id)(o.value));
    }

    const isCatBreed = (id: number | string) => {
        return !!cat.breeds.find(o => isSameId(id)(o.value));
    }

    // clear wrong species selections on species change
useEffect(() => {
    if (species === DogOrCat.CAT) {
        if ( isDogBreed(value) ) {
            setValue("All Breeds")
        }
    } else if (species === DogOrCat.DOG) {
        if ( isCatBreed(value) ) {
            setValue("All Breeds")
        }
    }
}, [species]);
 */
