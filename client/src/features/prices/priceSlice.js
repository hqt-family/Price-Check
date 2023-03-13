import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import priceServices from "./priceService";

const initialState = {
  prices: null,
  isErrorPrice: false,
  isSuccessPrice: false,
  isLoadingPrice: false,
  messagePrice: "",
};

export const createPrices = createAsyncThunk(
  "price/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await priceServices.create(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePrices = createAsyncThunk(
  "price/updates",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await priceServices.updates(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    resetPrice: (state) => {
      state.isErrorPrice = false;
      state.isSuccessPrice = false;
      state.isLoadingPrice = false;
      state.messagePrice = "";
      state.prices = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrices.pending, (state) => {
        state.isLoadingPrice = true;
      })
      .addCase(createPrices.fulfilled, (state, action) => {
        state.isLoadingPrice = false;
        state.isSuccessPrice = true;
        state.prices = action.payload;
      })
      .addCase(createPrices.rejected, (state, action) => {
        state.isLoadingPrice = true;
        state.isErrorPrice = true;
        state.messagePrice = action.payload;
        state.prices = null;
      })
      .addCase(updatePrices.pending, (state) => {
        state.isLoadingPrice = true;
        state.isErrorPrice = false;
        state.isSuccessPrice = false;
        state.messagePrice = "";
        state.prices = null;
      })
      .addCase(updatePrices.fulfilled, (state, action) => {
        state.isLoadingPrice = false;
        state.isErrorPrice = false;
        state.messagePrice = "";
        state.isSuccessPrice = true;
        state.prices = action.payload;
      })
      .addCase(updatePrices.rejected, (state, action) => {
        state.isLoadingPrice = false;
        state.isErrorPrice = true;
        state.messagePrice = action.payload;
        state.isSuccessPrice = false;
        state.prices = null;
      });
  },
});

export const { resetPrice } = priceSlice.actions;
export default priceSlice.reducer;
