import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, loginUser, updateUser } from "./authService";
import authServices from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  all: null,
};

export const get = createAsyncThunk(
  "auth/all",
  async (permission, thunkAPI) => {
    try {
      return await authServices.getUsers(permission);
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

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authServices.loginUser(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const update = createAsyncThunk("auth/update", async(userData, thunkAPI) => {
  try {
    return await authServices.updateUser(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(get.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.all = action.payload;
      })
      .addCase(get.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.all = null;
      }).addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.all = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.all = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
