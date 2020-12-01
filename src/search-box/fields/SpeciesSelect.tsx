import {Radio} from 'antd';
import {DogOrCat, EITHER_VAL, isDogOrCat} from "../../strings/species";
import React from "react";

/**
 * is 'either' an array with both dog and cat, or undefined?
 */
export interface Props {
    value?: DogOrCat | undefined;
    setValue: (val: DogOrCat | undefined) => void;
}

export const speciesOptions = [
    {
        label: 'Dogs',
        value: DogOrCat.DOG,
    },
    {
        label: 'Cats',
        value: DogOrCat.CAT,
    },
    {
        label: 'Either',
        value: EITHER_VAL
    },
]

export const SpeciesSelect = ({value, setValue}: Props) => {

//TODO: style default value separately from selected value
    return (
        <Radio.Group
            options={speciesOptions}
            onChange={e => {
                const val = e.target.value;
                if ( isDogOrCat(val) ) {
                    setValue( val );
                } else {
                    setValue(undefined);
                }
            }}
            defaultValue={EITHER_VAL}
            value={value || EITHER_VAL}
            optionType="button"
            buttonStyle="solid"
        />
    )
}
