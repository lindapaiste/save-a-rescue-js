import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {RgEntityAttributes, RgEntityType} from "../clientRg/attributes";
import {CollectionPayload, rgCollectionsSlice} from "./rgCollections";
import {RgRelationships} from "../clientRg/response";

/**
 * Keyed[K] is just the attributes.  Entity Record contains attributes plus id, type?, and relationships
 *
 * use Record string | number in order to allow accessing by numeric strings, since JS treats them equivalently
 *
 * don't need any sort of meta here -- either it's loaded or it isn't
 */
export type RgEntitiesState = {
    [K in keyof RgEntityAttributes]: Record<number | string, {
        attributes: RgEntityAttributes[K];
        id: string;
        relationships?: RgRelationships;
        type: K;
    }>
}

export type StateEntity<T extends RgEntityType> = RgEntitiesState[T][number];

export const initialState: RgEntitiesState = {
    animals: {},
    breeds: {},
    colors: {},
    patterns: {},
    species: {},
    statuses: {},
    fosters: {},
    locations: {},
    orgs: {},
    pictures: {},
    videourls: {},
    videos: {},
}

export const rgEntitiesSlice = createSlice({
    name: 'entities',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(rgCollectionsSlice.actions.receiveCollection, <T extends RgEntityType>(state: Draft<RgEntitiesState>, action: PayloadAction<CollectionPayload<T>>) => {
                const {type, response} = action.payload;
                const {data = {}, included = []} = response;
                // want to overwrite if from data but not if from included
                Object.values(data).forEach(obj => {
                    // @ts-ignore //TODO
                    state[type][obj.id] = obj;
                })
                included.forEach(obj => {
                    if (state[obj.type][obj.id] === undefined) {
                        state[obj.type][obj.id] = obj;
                    }
                })
            })
    })
});
