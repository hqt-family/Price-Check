import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import priceServices from "./priceService";

const initialState = {
  prices: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
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
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.prices = action.payload;
      })
      .addCase(createPrices.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.prices = null;
      })
      .addCase(updatePrices.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.prices = null;
      })
      .addCase(updatePrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.isSuccess = true;
        state.prices = action.payload;
      })
      .addCase(updatePrices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.prices = null;
      });
  },
});

export const { reset } = priceSlice.actions;
export default priceSlice.reducer;
