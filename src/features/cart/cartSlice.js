import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId, updateCart, deleteItemFromCart, createOrder,fetchLatestOrder } from './cartAPI';

const initialState = {
  items : [],
  latestOrder: null,
  status: 'idle',
};

export const clearCart = createAction('cart/clearCart');

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async ({ itemId, quantity }) => {
    const response = await updateCart(itemId, quantity);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);


export const createOrderAsync = createAsyncThunk(
  'cart/createOrder',
  async (orderData, { dispatch, getState }) => {
    const orderDataWithStatus = {
      ...orderData,
      status: 'Pending',
    };
    const response = await createOrder(orderDataWithStatus);

    // Get the current cart items from the state
    const cartItems = selectItems(getState());

    // Dispatch deleteItemFromCartAsync for each item in the cart
    cartItems.forEach((item) => {
      dispatch(deleteItemFromCartAsync(item._id));
    });

    return response.data;
  }
);

export const fetchLatestOrderAsync = createAsyncThunk(
  'cart/fetchLatestOrder',
  async (userId) => {
    const response = await fetchLatestOrder(userId);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    increment: (state) => {},
    // Remove the clearCart reducer case
  },

  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items.push(action.payload);
    })
    .addCase(fetchItemsByUserIdAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload;
    })
    .addCase(updateCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const { _id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    })
    .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = state.items.filter((item) => item._id !== action.payload.id);
    })
    .addCase(fetchLatestOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchLatestOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.latestOrder = action.payload[action.payload.length - 1];
    })
  },
});

export const { increment } = counterSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectLatestOrder = (state) => state.cart.latestOrder;
export default counterSlice.reducer;
