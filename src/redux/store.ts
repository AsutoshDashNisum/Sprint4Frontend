// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import promoReducer from './slices/promoSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    promo: promoReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
