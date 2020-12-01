import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * save recently viewed pets to redux
 * just an array of pet ids
 */

export const recentSlice = createSlice({
    name: 'recent',
    initialState: [] as string[],
    reducers: {
        addView: (state, action: PayloadAction<{id: string}>) => {
            /**
             * add new views to the front of the array, and make sure they aren't present twice
             */
            return [action.payload.id, ...state.filter( id => id !== action.payload.id)]
        }
    }
})
