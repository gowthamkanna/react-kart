import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "../services/productsServices";

export const getProducts = createAsyncThunk(
    "getProducts",
    async() => {
        const result = await productServices.getProducts();
        return result.data;
    }
);

export const getProductsById = createAsyncThunk(
    "getProductsById",
    async(Id) => {
        const result = await productServices.getProductsById(Id);
        return result.data;
    }
);

export const updateProduct = createAsyncThunk(
    "updateProduct",
    async(data) => {
        const result = await productServices.updateProduct(data);
        return result.data;
    }
);

export const createProduct = createAsyncThunk(
    "createProduct",
    async(data) => {
        const result = await productServices.createProduct(data);
        return result.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async(data) => {
        const result = await productServices.deleteProduct(data);
        return result.data;
    }
)

export const getLatestProducts = createAsyncThunk(
    "getLatestProducts",
    async() => {
        const result = await productServices.getLatestProduct();
        return result.data;
    }
)

const productSlice = createSlice({
    name : "product",
    initialState : {
        products: [],
        currentProduct: {},
        loading: false,
        message: {},
        latestProducts: {},
    },
    extraReducers:{
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.message = "";
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
            state.message =  action.payload;
        },
        [getProductsById.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductsById.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentProduct = action.payload;
        },
        [getProductsById.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.currentProduct = {};
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.currentProduct = {};
        },
        [createProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.currentProduct = {};
        },
        [deleteProduct.rejected]: (state, action) => {
            state.message = action.payload;
            state.currentProduct = {};
        },
        [getLatestProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getLatestProducts.fulfilled]: (state, action) => {
            state.loading= false;
            state.latestProducts = action.payload;
        },
        [getLatestProducts.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        }
    }
});

export const {reducer} = productSlice;

export default reducer;