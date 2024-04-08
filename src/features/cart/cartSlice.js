//necessary imports
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId, updateCart, deleteItemFromCart, createOrder,fetchLatestOrder } from './cartAPI';

const initialState = {
  items : [],
  latestOrder: null,
  status: 'idle',
};

//action to clear a cart when user checks out and click on pay now button

export const clearCart = createAction('cart/clearCart');


// Async thunk to add an item to the cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);


// Async thunk to fetch all items in the cart for a given user _id
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

// Async thunk to update the quantity of an item in the cart
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async ({ itemId, quantity }) => {
    const response = await updateCart(itemId, quantity);
    return response.data;
  }
);

// Async thunk to delete an item from the cart
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

// Async thunk to create an order
export const createOrderAsync = createAsyncThunk(
  'cart/createOrder',
  async (orderData, { dispatch, getState }) => {
    const orderDataWithStatus = {
      ...orderData,
      status: 'Pending',
    };
    const response = await createOrder(orderDataWithStatus);

    const cartItems = selectItems(getState());

    cartItems.forEach((item) => {
      dispatch(deleteItemFromCartAsync(item._id));
    });

    return response.data;
  }
);

// Async thunk to fetch the latest order for a given user _id
export const fetchLatestOrderAsync = createAsyncThunk(
  'cart/fetchLatestOrder',
  async (userId) => {
    const response = await fetchLatestOrder(userId);
    return response.data;
  }
);

// Create a slice for the user state
export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    increment: (state) => {},
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

// Export actions and selectors for the cart slice
export const { increment } = counterSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectLatestOrder = (state) => state.cart.latestOrder;
export default counterSlice.reducer;
