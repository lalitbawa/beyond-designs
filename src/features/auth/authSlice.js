//necesary imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};

// Async thunk to create a user
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

// Async thunk to check user login
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to sign out user
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut();
      return { message: 'Logout successful' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for the user state
export const counterSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
  },
});

// Selectors to access the user state
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoggedInError = (state) => state.auth.error;

export default counterSlice.reducer;
