//neccessary imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrders } from './userApi';

const initialState = {
    orders: [],
    status: 'idle',
    error: null,
  };

// Create an async thunk to fetch all orders for the current logged in user
export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async (userId) => {
    const response = await fetchUserOrders(userId);
    return response.data;
  }
);

// Create a slice to manage the state of the user
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders = action.payload;
        })
        .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
          state.status = 'idle';
          state.error = action.error;
        });
    },
  });

export const selectUserOrders = (state) => state.user.orders;

export default userSlice.reducer;