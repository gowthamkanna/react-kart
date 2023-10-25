import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import categoryServices from '../services/categoryServices';



export const getCategories = createAsyncThunk(
  "getCategories",
  async () => {
  const result = await categoryServices.getCategories();
  return result.data;
  }
);

export const getCategoriesById = createAsyncThunk(
  "getCategoriesById",
  async (id) => {
  const result = await categoryServices.getCategoriesById(id);
  return result.data;
  }
);

export const createCategory = createAsyncThunk(
  "createCategory",
  async (data) => {
    const result = await categoryServices.createCategory(data);
    return result.data;
  }
)

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (data) => {
    const result = await categoryServices.updateCategory(data);
    return result.data;
  } 
)
export const deleteCategory = createAsyncThunk(
  "deleteCategory", 
  async(id) => {
    const result = await categoryServices.deleteCategory(id);
    return result.data;
  } 
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    editCategory: {},
    loading: null,
    errors: "",
    success: "",
  },
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.success ="";
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getCategoriesById.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoriesById.fulfilled]: (state, action) => {
      state.editCategory = action.payload;
    },
    [getCategoriesById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.success = action.payload;
      state.editCategory = {};
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [createCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.success = action.payload;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.success = action.payload;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    

  }  
});


export const {reducer} = categorySlice;

export default reducer;