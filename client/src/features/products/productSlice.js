import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productServices from './productService';

const initialState = {
  products: null,
  isLoadingProduct: false,
  isErrorProduct: false,
  messageProduct: "",
}

export const getProducts = createAsyncThunk(
  'products/all',
  async (data, thunkAPI) => {
    try {
      return await productServices.call_apiProduct(data)
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
      state.isLoadingProduct = false;
      state.isErrorProduct = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoadingProduct = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.isErrorProduct = true;
        state.messageProduct = action.payload;
        state.products = null;
      })
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
