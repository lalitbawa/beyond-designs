//necessary imports
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import productReducer from "../features/product-list/ProductSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";

// Configuration for Redux Persist
const persistConfig = {
 key: 'root', 
 storage, // The storage engine to use (in this case, the browser's localStorage)
 whitelist: ['auth'], 
};

const rootReducer = combineReducers({
 product: productReducer,
 auth: authReducer,
 cart: cartReducer,
 user: userReducer,
});

// Create a persisted version of the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
// and configure middleware to ignore the 'persist/PERSIST' action
// (this suppresses a warning related to the serialization of the persisted state)
export const store = configureStore({
 reducer: persistedReducer,
 middleware: getDefaultMiddleware({
   serializableCheck: {
     ignoredActions: ['persist/PERSIST'],
   },
 }),
});

export const persistor = persistStore(store);