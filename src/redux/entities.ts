import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {EntityAttributes, EntityType} from "../client/attributes";
import {CollectionPayload, collectionsSlice} from "./collections";
import {Relationships} from "../client/response";

/**
 * Keyed[K] is just the attributes.  Entity Record contains attributes plus id, type?, and relationships
 *
 * use Record string | number in order to allow accessing by numeric strings, since JS treats them equivalently
 */
export type EntitiesState = {
    [K in keyof EntityAttributes]: Record<number | string, {
        attributes: EntityAttributes[K];
        id: string;
        relationships?: Relationships;
        type: K;
    }>
}

export type StateEntity<T extends EntityType> = EntitiesState[T][number];

export const initialState: EntitiesState = {
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

export const entitiesSlice = createSlice({
    name: 'entities',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(collectionsSlice.actions.receiveCollection, <T extends EntityType>(state: Draft<EntitiesState>, action: PayloadAction<CollectionPayload<T>>) => {
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
