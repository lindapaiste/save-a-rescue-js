import {EntityType} from "../client/attributes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseBody, ResponseMeta} from "../client/response";

export interface Collection {
    type: EntityType;
    /**
     * group ids by page
     * use zero index, so page #1 is actually ids[0]
     * could also slice in
     */
    ids: string[][];
    meta: ResponseMeta;
}

export type CollectionsState = Partial<Record<string, Collection>>;

export interface CollectionPayload<T extends EntityType> {
    type: T;
    key: string;
    response: ResponseBody<T>;
}

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState: {} as CollectionsState,
    reducers: {
        receiveCollection<T extends EntityType>( state: CollectionsState, action: PayloadAction<CollectionPayload<T>>) {
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

export const {receiveCollection} = collectionsSlice.actions;
