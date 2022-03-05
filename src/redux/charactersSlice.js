import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const pageLimit = 12;

export const fetchCharacters = createAsyncThunk("characters/getCharacters", async (page) => {
    const res = await axios.get(`https://gateway.marvel.com/v1/public/characters?offset=${pageLimit * page}&limit=${pageLimit}`,{
        params: {
            apikey: "f2f629fceb0c7b1effeb338fc4d26448",
            ts:1,
            hash:"8397705a38cce656bd08e96ddb9fe91d",
        }
    });
    return res.data.data.results;
});

export const charactersSlice = createSlice({
    name:"characters",
    initialState:{
        items:[],
        isLoading:"initial",
        page: 0,
        hasNextPage:true
    },
    reducers:{},
    extraReducers:{
        [fetchCharacters.pending]: (state,action) => {
            state.isLoading = "pending";
        },
        [fetchCharacters.fulfilled]: (state,action) => {
            state.isLoading = "fulfilled";
            action.payload.length < 12 ? state.hasNextPage = false : state.hasNextPage = true;
            state.items = [...state.items,...action.payload];
            state.page += 1;
        },
        [fetchCharacters.rejected]: (state,action) => {
            state.isLoading = "rejected";
            state.error = action.error.message;
        }
        
    },
});

export default charactersSlice.reducer;