import React, {ComponentType} from "react";
import {isNonNullable} from "@lindapaiste/ts-helpers";

export interface Props<T> {
    value: T;
    Render: ComponentType<{value: NonNullable<T>}>
}

export const IfTruthy = <T extends any>({value, Render}: Props<T>) => {
    if ( isNonNullable(value) ) {
        return (
            <Render value={value}/>
        )
    } else return  null;
}
