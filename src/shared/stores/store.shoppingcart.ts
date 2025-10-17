import { configureStore } from '@reduxjs/toolkit';
import { shopReducer } from './shopSlice.shoppingcart';

/* Tạo store */
export var store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

/* Types tiện dụng */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
