import React, {FunctionComponent, ReactNode} from "react";
import {Defined, isDefined} from "@lindapaiste/ts-helpers";

/**
 * Utility wrapper component which hides itself and children if `value` is `undefined` (or failure of custom guard).
 * Children can be regular JSX or a function of the guarded value, if the value needs to be guarded in order to
 * properly render the component.
 */

export interface Props<T, G extends T> {
    value: T;
    guard: (val: T) => val is G;
    children: FunctionComponent<{ value: G }> | ReactNode;
}

export const IfGuarded = <T, G extends T>({value, guard, children}: Props<T, G>) => {
    if (guard(value)) {
        return (typeof children === 'function') ? children({value}) : children;
    } else {
        return null;
    }
}

/**
 * factory helper -- doesn't really work because T is likely to unknown based on guard alone
 */
const makeGuard = <T, G extends T>(guard: Props<T, G>['guard']): FunctionComponent<Omit<Props<T, G>, 'guard'>> =>
    (props) => IfGuarded({...props, guard});

export const IfDefined = <T, >(props: Omit<Props<T, Defined<T>>, 'guard'>) => IfGuarded({...props, guard: isDefined});

function isTruthy(value: boolean | undefined): value is true;
function isTruthy<T>(value: T): value is NonNullable<T>;
function isTruthy(value: any): boolean {
    return !!value;
}

export const IfTruthy = <T, >(props: Omit<Props<T, NonNullable<T>>, 'guard'>) => IfGuarded({...props, guard: isTruthy});
