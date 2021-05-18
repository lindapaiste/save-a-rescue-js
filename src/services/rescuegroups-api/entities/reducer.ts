/* eslint-disable no-param-reassign */
import { createReducer, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CollectionPayload, loadCollection } from "../collections/load";
import { initialState, RgEntitiesState } from "./state";
import { RgIncluded } from "../schema/response";

/**
 * Entities state allows every entity to be accessed by its type and id.
 *
 * Each entity record contains attributes plus id, type, and relationships.
 */

export const rgEntitiesReducer = createReducer(
  initialState,
  /**
   * Responds to the receiveCollection action by storing all entities in the response.
   *
   * Responses for a single entity request share the same format as collections,
   * and can be handled through the same action.
   */
  (builder) =>
    builder.addCase(
      loadCollection.fulfilled,
      (
        state: Draft<RgEntitiesState>,
        action: PayloadAction<CollectionPayload>
      ) => {
        const { data = {}, included = [] } = action.payload.response;
        /**
         * Need to make sure that an empty object exists for every type
         * in order to avoid errors like "Cannot set property '4808246' of undefined".
         * This should be handled by initialState,
         * but want to add extra handling in the reducer so that nothing breaks
         * if the API response adds additional types in the future.
         * Could initialize an object or could skip over.
         *
         * Received entities should overwrite any previous version
         * if from `data`, but not if from `included`.
         * This ensures that `relationships` is not overwritten.
         */
        const entitiesToAdd: RgIncluded[] = Object.values(data).concat(
          ...included.filter((obj) => state[obj.type]?.[obj.id] === undefined)
        );
        entitiesToAdd.forEach((obj) => {
          if (!state[obj.type]) {
            state[obj.type] = {};
          }
          state[obj.type][obj.id] = obj;
        });
      }
    )
);
