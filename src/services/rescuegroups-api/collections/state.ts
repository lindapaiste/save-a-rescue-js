import { RgEntityType } from "../schema/attributes";
import { RgResponseMeta } from "../schema/response";

/**
 * Collections slice stores the ids associated with a collection.
 * The ids and type can be used to lookup the entity from the entities slice.
 */

export interface RgCollection {
  type: RgEntityType;
  /**
   * group ids by page
   * use zero index, so page #1 is actually ids[0]
   */
  ids: string[][];
  meta: RgResponseMeta;
}

export type StatusName = "pending" | "rejected" | "fulfilled";
export const statusBooleans = (status?: StatusName) => ({
  isLoading: status === "pending",
  isError: status === "rejected",
});

export interface FetchStatus {
  status: StatusName;
  error?: string;
}

export interface RgCollectionsState {
  /**
   * An object of collections which are keyed by a string key,
   * typically the url associated with the collection.
   */
  data: Partial<Record<string, RgCollection>>;
  /**
   * The corresponding fetch statuses.
   */
  status: Partial<Record<string, FetchStatus>>;
}

export const initialState: RgCollectionsState = {
  data: {},
  status: {},
};
