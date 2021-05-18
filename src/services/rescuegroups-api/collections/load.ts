import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectStatusByKey } from "./selectors";
import { RgRequestAction } from "../client/Executable";
import { client } from "../client";
import { RgEntityType } from "../schema/attributes";
import { RgResponseBody } from "../schema/response";
import { RgCollectionsState } from "./state";

export interface CollectionPayload<T extends RgEntityType = RgEntityType> {
  type: T;
  key: string;
  response: RgResponseBody<T>;
}

/**
 * Note: the payload creator cannot be generic.
 *
 * Cannot pass any non-serializable arguments as thunk arg.
 */
export const loadCollection = createAsyncThunk(
  "collections/fetch",
  async ({ type, args, key }: RgRequestAction): Promise<CollectionPayload> => {
    const response = await client.request(args);
    return {
      type,
      key,
      response,
    };

    // TODO: need to check that errors are thrown  - might need to look at response?.data?.errors
  },
  /**
  /**
   * Don't fetch if already loading.
   */
  {
    condition: ({ key }, { getState }): boolean | undefined => {
      const { status } = selectStatusByKey(key)(
        getState() as { collections: RgCollectionsState }
      );
      return status === "pending" ? false : undefined;
    },
  }
);
