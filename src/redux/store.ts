import {bindActionCreators, configureStore} from "@reduxjs/toolkit";
import {entitiesSlice, EntitiesState} from "./entities";
import {collectionsSlice, CollectionsState} from "./collections";
import {useSelector as useReduxSelector} from "react-redux";
import {locationSlice} from "./location";
import {recentSlice} from "./recent";

export const store = configureStore({
    reducer: {
        entities: entitiesSlice.reducer,
        collections: collectionsSlice.reducer,
        location: locationSlice.reducer,
        recent: recentSlice.reducer,
    }
});

export type State = ReturnType<typeof store.getState>

/**
 * changes from generic of State and Selected to just Selected because State is known
 */
export const useSelector = <Selected>(selector: (state: State) => Selected) =>
    useReduxSelector<State, Selected>(selector);

export const useEntitiesSelector = <Selected>(selector: (entities: EntitiesState) => Selected) =>
    useReduxSelector<State, Selected>(state => selector(state.entities));

export const useCollectionsSelector = <Selected>(selector: (entities: CollectionsState) => Selected) =>
    useReduxSelector<State, Selected>(state => selector(state.collections));


export const actions = {
    ...entitiesSlice.actions,
    ...collectionsSlice.actions,
    ...locationSlice.actions,
    ...recentSlice.actions
}

export const boundActions = bindActionCreators(actions, store.dispatch);
