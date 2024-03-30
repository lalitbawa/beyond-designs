import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductSlice'

export const store = configureStore({
  reducer: {
    product:productReducer
  },
});
