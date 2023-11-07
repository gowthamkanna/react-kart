import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerServices from "../services/customerServices";

export const customerRegister = createAsyncThunk(
    "customerRegiter",
    async (data) => {
        const result = await customerServices.customerRegister(data);
        return result.data;
    }
);
export const customerLogin = createAsyncThunk(
    "customerLogin",
    async (data) => {
        const result = await customerServices.customerLogin(data);
        return result.data;
    }
);

export const customerLogout = createAsyncThunk(
    "customerLogout",
    async () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
    }
  );

export const getCustomerData = createAsyncThunk(
    "getCustomerData",
    async (id) => {
        const result = await customerServices.getCustomerData(id);
        return result.data;
    }
)

export const getCustomerWishlistedProducts = createAsyncThunk("getCustomerWishlistedProducts", async (id) => {
    const result = await customerServices.getCustomerWishlistedProducts(id);
    return result.data;
}
)

export const addToWishlist = createAsyncThunk("addToWishlist", async({ userID, productID }) => {
    const result = await customerServices.addToWishlist({ userID, productID });
    return result.data;
})

export const removeWishlist = createAsyncThunk("removeWishlist", async({ userID, productID }) => {
    const result = await customerServices.removeWishlist({ userID, productID });
    return result.data;
})

export const addToCart = createAsyncThunk("addToCart", async({ userID, productID }) => {
    const result = await customerServices.addToCart({ userID, productID });
    return result.data;
})

export const getCartById = createAsyncThunk("getCartById", async(userID) => {
    const result = await customerServices.getCartById(userID);
    return result.data;
})

export const deletecartById = createAsyncThunk("deletecartById", async({userID, productID}) => {
    const result = await customerServices.deletecartById({userID, productID});
    return result.data;
})

const customerSlice = createSlice({
    name: "customer",
    initialState : {
        customer:{},
        wishlist:[],
        cart:[],
        message: {},
        loading: false,
    },
    extraReducers: {
        [customerRegister.pending]: (state, action) => {
            state.loading = true;
        },
        [customerRegister.fulfilled]: (state, action) => {
            state.loading = false;
            state.customer= action.payload;
        },
        [customerRegister.rejected]: (state, action) => {
            state.loading= false;
            state.message= action.payload;
        },
        [customerLogin.pending]: (state, action) => {
            state.loading = true;
        },
        [customerLogin.fulfilled]: (state, action) => {
            state.loading = false;
            state.customer= action.payload;
        },
        [customerLogin.rejected]: (state, action) => {
            state.loading= false;
            state.message= action.payload;
        },
        [customerLogout.pending]: (state, action) => {
            state.loading = true;
        },
        [customerLogout.fulfilled]: (state, action) => {
            state.loading= false;
            state.customer = null;
        },
        [customerLogout.rejected]: (state, action) => {
            state.loading= false;
            state.message= action.payload;
        },
        [getCustomerData.pending]: (state, action) => {
            state.loading = true;
        },
        [getCustomerData.fulfilled]: (state, action) => {
            state.loading= false;
            state.customer = action.payload;
        },
        [getCustomerData.rejected]: (state, action) => {
            state.loading= false;
            state.message= action.payload;
        },
        [getCustomerWishlistedProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getCustomerWishlistedProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.customer.WishlistedProducts = action.payload;
        },
        [getCustomerWishlistedProducts.rejected]: (state, action) => {
            state.message = action.payload;
        },
        [addToWishlist.pending]: (state, action) => {
            state.loading = true;
        },
        [addToWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.wishlist = action.payload.wishlist;
        },
        [addToWishlist.rejected]: (state, action) => {
            state.message = action.payload;
        },
        [removeWishlist.pending]: (state, action) => {
            state.loading = true;
        },
        [removeWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.wishlist = action.payload.wishlist;
        },
        [removeWishlist.rejected]: (state, action) => {
            state.message = action.payload;
        },
        [addToCart.pending]: (state, action) => {
            state.loading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
        },
        [addToCart.rejected]: (state, action) => {
            state.message = action.payload;
        },
        [getCartById.pending]: (state, action) => {
            state.loading = true;
        },
        [getCartById.fulfilled]: (state, action) => {
            state.loading = false;
            state.customer.cart = action.payload;
        },
        [getCartById.rejected]: (state, action) => {
            state.message = action.payload;
        },
        [deletecartById.pending]: (state, action) => {
            state.loading = true;
        },
        [deletecartById.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
        },
        [deletecartById.rejected]: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const getCartProductsById = (state) => state.customer.customer.AddToCart;

export const {reducer} = customerSlice;

export default reducer;