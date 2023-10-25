import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewServices from "../services/reviewServices";

export const getReviews = createAsyncThunk(
    "getReviews",
    async() => {
        const result = reviewServices.getReviews();
        return (await result).data;
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        loading: false,
        message: {},
    },
    extraReducers:{
        [getReviews.pending]: (state, action) => {
            state.loading = true;
        },
        [getReviews.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [getReviews.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    }
});

export const {reducer} = reviewSlice;

export default reducer;