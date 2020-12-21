import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Location as HistoryLocation} from 'history';

/**
 * all information is now stored in the URL, so just need to store a single string
 * but should store path as well for compatibility with future breed searching
 */

type LastSearchState = null | HistoryLocation;

export const lastSearchSlice = createSlice({
    name: 'lastSearch',
    initialState: null as LastSearchState,
    reducers: {
        didSearch: (state, action: PayloadAction<HistoryLocation>) => {
            return action.payload;
        }
    }
});
