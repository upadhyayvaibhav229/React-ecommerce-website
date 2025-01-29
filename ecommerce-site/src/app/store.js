import { configureStore } from "@reduxjs/toolkit";
import shopReducer from  '../Features/shopSlice'
import cartReducer from  '../Features/cartSlice'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,

  },
});
