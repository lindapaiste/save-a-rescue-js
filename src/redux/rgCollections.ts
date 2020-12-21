import {RgEntityType} from "../clientRg/attributes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RgResponseBody, RgResponseMeta} from "../clientRg/response";

export interface RgCollection {
    type: RgEntityType;
    /**
     * group ids by page
     * use zero index, so page #1 is actually ids[0]
     * could also slice in
     */
    ids: string[][];
    meta: RgResponseMeta;
}

export type RgCollectionsState = Partial<Record<string, RgCollection>>;

export interface CollectionPayload<T extends RgEntityType> {
    type: T;
    key: string;
    response: RgResponseBody<T>;
}

export const rgCollectionsSlice = createSlice({
    name: 'collections',
    initialState: {} as RgCollectionsState,
    reducers: {
        receiveCollection<T extends RgEntityType>(state: RgCollectionsState, action: PayloadAction<CollectionPayload<T>>) {
            const {type, response, key} = action.payload;
            const {meta, data = {}} = response;
            // initialize with empty if needed
            const collection = state[key] || {
                    type,
                    ids: [],
                    meta,
                };
            // add ids
            collection.ids[meta.pageReturned - 1] = Object.values(data).map(o => o.id);
            // overwrite meta
            collection.meta = meta;
            state[key] = collection;
        },
    }
});

export const {receiveCollection} = rgCollectionsSlice.actions;
