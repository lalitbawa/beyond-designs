import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrders } from './userApi';

const initialState = {
    orders: [],
    status: 'idle',
    error: null,
  };

export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async (userId) => {
    const response = await fetchUserOrders(userId);
    return response.data;
  }
);

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