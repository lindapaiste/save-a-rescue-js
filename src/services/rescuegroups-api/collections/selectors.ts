import { FetchStatus, RgCollection, RgCollectionsState } from "./state";

interface RootState {
  collections: RgCollectionsState;
}

/**
 * Non-memoized lookup helper to get a collection from its key.
 * Just to add a layer of abstraction and flexibility.
 */
export const selectCollectionByKey =
  (key: string) =>
  (state: RootState): RgCollection | undefined =>
    state.collections.data[key];

/**
 * Return an empty object instead of undefined so that it can be destructured.
 */
export const selectStatusByKey =
  (key: string) =>
  (state: RootState): Partial<FetchStatus> =>
    state.collections.status[key] ?? {};
