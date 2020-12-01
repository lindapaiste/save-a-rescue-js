import {ReactNode} from "react";
import {isNonNullable} from "@lindapaiste/ts-helpers";
import React from "react";

export interface Props {
    array: ReactNode[];
    separator: ReactNode;
}

/**
 * cannot return just the React Node because it could be undefined, which is not valid as a component return
 * so always need to wrap in a fragment
 *
 * but now filtering out null/undefined so not needed
 */
export const Join = ({array, separator}: Props) => {
    const filtered = array.filter(isNonNullable);
    if (filtered.length === 0) {
        return null;
    } else if (filtered.length === 1) {
        return <>{filtered[0]}</>;
    } else {
        return <>{filtered.reduce((prev, curr) => [prev, separator, curr])}</>;
    }
}

/*
Without second argument, reduce() will start at index 1 instead of 0, and React is perfectly happy with nested arrays.

As said in the comments, you want to only use this for arrays with at least one item, because reduce() without second argument will throw with an empty array. Normally this should not be a problem, since you want to display a custom message saying something like 'this is empty' for empty arrays anyway.
https://stackoverflow.com/questions/34034038/how-to-render-react-components-by-using-map-and-join
 */
