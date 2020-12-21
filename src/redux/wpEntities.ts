import {createSlice} from "@reduxjs/toolkit";
import {WpEitherAttributes, WpEntityAttributes, WpEntityType, WpRootAttributes} from "../clientWp/objects";
import {FetchMeta} from "../clientWp/meta";


export type WpStateEntity<T extends WpEntityType> = {
    id: string;
    type: T;
    meta: FetchMeta;
    //fields?:
} & Partial<WpEntityAttributes[T]> // root and embed

export type WpEntitiesState = {
    [K in WpEntityType]?: Partial<Record<number | string, WpStateEntity<K>>>
}

export const initialState: WpEntitiesState = {};


export const wpEntitiesSlice = createSlice({
    name: 'wpEntities',
    initialState,
    reducers: {}
});

interface ParentState {
    wpEntities: WpEntitiesState;
}

export const getDidLoadRoot = <T extends WpEntityType>(type: T, id: string) =>
    (state: ParentState): boolean => {
        return state.wpEntities[type]?.[id]?.root !== undefined;
    }

export const getRootJson = <T extends WpEntityType>(type: T, id: string) =>
    (state: ParentState): WpRootAttributes<T> | undefined => {
        return state.wpEntities[type]?.[id]?.root;
    }

export const getEitherJson = <T extends WpEntityType>(type: T, id: string) =>
    (state: ParentState): WpEitherAttributes<T> | undefined => {
        const obj = state.wpEntities[type]?.[id];
        return obj?.root ?? obj?.embedded;
    }

export const getAttribute = <T extends WpEntityType, K extends keyof WpEitherAttributes<T>>(type: T, id: string, attribute: K) =>
    (state: ParentState): WpRootAttributes<T>[K] | undefined => {
        // need `as` because of `extends` -- doesn't know the json matches only the current type T
        return getEitherJson(type, id)(state)?.[attribute] as WpRootAttributes<T>[K] | undefined;
    }
