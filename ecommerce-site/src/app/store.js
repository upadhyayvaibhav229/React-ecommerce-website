import { configureStore } from "@reduxjs/toolkit";
import shopReducer from  '../Features/shopSlice'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
