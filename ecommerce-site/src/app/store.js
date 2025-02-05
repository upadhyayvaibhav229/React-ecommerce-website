import { configureStore } from "@reduxjs/toolkit";
import shopReducer from  '../Features/shopSlice'
import cartReducer from  '../Features/cartSlice'
import SearchFilterReducer from '../Features/SearchFilter'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    searchFilter: SearchFilterReducer
  },
});
