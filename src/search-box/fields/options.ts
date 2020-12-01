export type OptionValues = string | number | boolean;

export interface BasicOption<T extends OptionValues = string> {
    label: string;
    value: T;
}

export const stringOptions = <T extends OptionValues = string>(values: readonly T[]): BasicOption<T>[] => {
    return values.map( value => ({
        label: value.toString(),
        value
    }))
}
