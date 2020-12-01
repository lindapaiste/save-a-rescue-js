import {Checkbox} from "antd";
import React from "react";
import {CheckboxValueType, CheckboxOptionType} from "antd/lib/checkbox/Group";

/**
 * checkboxes for the values of a string enum like sizes or ages
 */

export interface Props<T> {
    value: T[];
    setValue: (checked: T[]) => void;
    options: EitherOption<T>[];
}

/**
 * add specific value to Antd option object
 */
type OptionObject<T> = Omit<CheckboxOptionType, 'value'> & { value: T }

/**
 * options can be an array of objects or the raw T values
 */
type EitherOption<T> = OptionObject<T> | T;

const eitherToOption = <T extends CheckboxValueType>(value: EitherOption<T>): OptionObject<T> => {
    return typeof value === "object" ? value : {
        label: value.toString(),
        value,
    }
}

export const CheckEnumSelect = <T extends CheckboxValueType = string>({value, setValue, options}: Props<T>) => {
    return (
        <Checkbox.Group
            options={options.map(eitherToOption)}
            defaultValue={[]}
            value={value}
            onChange={(v) => setValue(v as T[])}
        />
    )
}
