import { combineReducers, configureStore, DeepPartial } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { rgEntitiesReducer } from "./rescuegroups-api/entities/reducer";
import { rgCollectionsReducer } from "./rescuegroups-api/collections/reducer";
import { locationReducer } from "./location/redux/reducer";
import { recentReducer } from "./recently-viewed/recent";
import { RgEntitiesState } from "./rescuegroups-api/entities/state";

const rootReducer = combineReducers({
  entities: rgEntitiesReducer,
  collections: rgCollectionsReducer,
  location: locationReducer,
  recent: recentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = createStore();

export type AppDispatch = ReturnType<typeof createStore>["dispatch"];

/**
 * changes from generic of RootState and Selected to just Selected because RootState is known
 */
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch: () => AppDispatch = useReduxDispatch;

export const useEntitiesSelector = <Selected>(
  selector: (entities: RgEntitiesState) => Selected
) => useReduxSelector<RootState, Selected>((state) => selector(state.entities));
