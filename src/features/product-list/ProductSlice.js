import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../product-list/ProductApi';

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductsStatus = (state) => state.product.status;

export default productSlice.reducer;