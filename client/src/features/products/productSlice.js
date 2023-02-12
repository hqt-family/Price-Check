import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productServices from './productService';

const initialState = {
  products: null,
  isError: false,
  message: "",
}

export const getAll = createAsyncThunk(
  'products/all',
  async (data, thunkAPI) => {
    try {
      return await productServices.getAll(data)
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
)

export const getFilter = createAsyncThunk(
  'products/filter',
  async (data, thunkAPI) => {
    try {
      return await productServices.getFilter(data)
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
)

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = null;
      })
      .addCase(getFilter.pending, (state) => {
        state.isLoading = true;
        state.products = null;
      })
      .addCase(getFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = null;
      })
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
