import {
    bindActionCreators,
    CaseReducerActions,
    configureStore,
    ReducersMapObject,
    Slice,
    SliceCaseReducers
} from "@reduxjs/toolkit";
import {rgEntitiesSlice, RgEntitiesState} from "./rgEntities";
import {rgCollectionsSlice, RgCollectionsState} from "./rgCollections";
import {useSelector as useReduxSelector} from "react-redux";
import {locationSlice} from "./location";
import {recentSlice} from "./recent";
import {Action, AnyAction, Reducer} from "redux";
import {typedKeys} from "@lindapaiste/ts-helpers";
import mapValues from "lodash/mapValues";
import {lastSearchSlice} from "./lastSearch";

const sliceMap = {
    entities: rgEntitiesSlice,
    collections: rgCollectionsSlice,
    location: locationSlice,
    recent: recentSlice,
    lastSearch: lastSearchSlice,
}

type MySliceMap = typeof sliceMap;

type StateFromSlices<S> = {
    [K in keyof S]: S[K] extends Slice<infer State> ? State : never;
}

type ActionsFromSlices<S> = {
    //[K in keyof S]: S[K] extends Slice<any, infer CaseReducers> ? CaseReducerActions<CaseReducers> : never;
    [K in keyof S]: S[K] extends Slice ? S[K]['actions'] : never;
}

//type MyState = StateFromSlices<typeof sliceMap>

export type State = {
    [K in keyof MySliceMap]: MySliceMap[K] extends Slice<infer State> ? State : never;
}

/**
 * instead of passing a keyed map object, could pass an array and use the 'name' property as the key
 * eliminates the possibility of nesting
 */

type SlicesMapObject<S> = {
    [K in keyof S & string]: Slice<S[K], SliceCaseReducers<S[K]>, K>;
}
type SlicesArray<S> = SlicesMapObject<S>[keyof S & string][];

type ActionsMapObject<S> = {
    [K in keyof S & string]: CaseReducerActions<SliceCaseReducers<S[K]>>
}

const storeCreator = <S = any>(slices: SlicesArray<S>) => {


}

const reducer = mapValues(sliceMap, slice => slice.reducer) as any as ReducersMapObject<State>;
export const store = configureStore({
    reducer
});

//not typed properly yet
//export const actions = mapValues(sliceMap, slice => slice.actions) as any as ActionsFromSlices<State>;

export const _store = configureStore({
    reducer: {
        entities: rgEntitiesSlice.reducer,
        collections: rgCollectionsSlice.reducer,
        location: locationSlice.reducer,
        recent: recentSlice.reducer,
    }
});

export type _State = ReturnType<typeof store.getState>

/**
 * changes from generic of State and Selected to just Selected because State is known
 */
export const useSelector = <Selected>(selector: (state: State) => Selected) =>
    useReduxSelector<State, Selected>(selector);

export const useEntitiesSelector = <Selected>(selector: (entities: RgEntitiesState) => Selected) =>
    useReduxSelector<State, Selected>(state => selector(state.entities));

export const useCollectionsSelector = <Selected>(selector: (entities: RgCollectionsState) => Selected) =>
    useReduxSelector<State, Selected>(state => selector(state.collections));


export const flatActions = {
    ...rgEntitiesSlice.actions,
    ...rgCollectionsSlice.actions,
    ...locationSlice.actions,
    ...recentSlice.actions,
        ...lastSearchSlice.actions,
}

// nesting mainly helps avoid naming collisions while keeping the slices fully independent
export const nestedActions = {
    entities: rgEntitiesSlice.actions,
    collections: rgCollectionsSlice.actions,
    location: locationSlice.actions,
    recent: recentSlice.actions,
    lastSearch: lastSearchSlice.actions,
}

export const boundActions = bindActionCreators(flatActions, store.dispatch);
