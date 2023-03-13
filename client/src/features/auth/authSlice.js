import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isErrorUser: false,
  isSuccessUser: false,
  isLoadingUser: false,
  messageUser: "",
  allUser: null,
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
    return await authServices.updateUser(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const logout = createAsyncThunk("auth/logout", async() => {
  await authServices.logoutUser();
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrorUser = false;
      state.isSuccessUser = false;
      state.isLoadingUser = false;
      state.messageUser = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingUser = true;
        state.isErrorUser = true;
        state.messageUser = action.payload;
        state.user = null;
      })
      .addCase(get.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
        state.allUser = action.payload;
      })
      .addCase(get.rejected, (state, action) => {
        state.isLoadingUser = true;
        state.isErrorUser = true;
        state.messageUser = action.payload;
        state.allUser = null;
      }).addCase(update.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
        state.allUser = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoadingUser = true;
        state.isErrorUser = true;
        state.messageUser = action.payload;
        state.allUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.allUser = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
