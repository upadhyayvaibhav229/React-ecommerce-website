import { configureStore } from "@reduxjs/toolkit";
import shopReducer from  '../Features/shopSlice'
import cartReducer from  '../Features/cartSlice'
import SearchFilterReducer from '../Features/SearchFilter'
import authReducer from '../Features/authSlice'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    searchFilter: SearchFilterReducer,
    auth: authReducer
  },
});
