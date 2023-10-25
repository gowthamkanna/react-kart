import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import UserDataServices from '../services/userServices';

const initialState = {
    email: null,
    token: null,
}

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ email, password }) => {
  const res = await UserDataServices.userLogin({ email, password });
  return res.data;
  }
);

export const userLogout = createAsyncThunk(
  "userLogout",
  async () => {
  return initialState;
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      return {...action.payload};
    },
    [userLogout.fulfilled]: (state, action) => {
      state = {
        ...action.payload
      }
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
    },
  }  
});

export const {reducer} = userSlice;

export default reducer;