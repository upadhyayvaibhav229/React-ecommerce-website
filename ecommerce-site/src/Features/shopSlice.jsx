import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/frontend_assets/products";

const initialState = {
  products: products, //Importing the products array
  currency: "₹",
  deliveryFee: 10,
  cart: [],
  totalprice: 0,
  totalQuantity: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
});

// export const { setSearchTerm, clearSearchTerm } = shopSlice.actions;

export const selectShop = (state) => state.shop; // Selector to access shop state

export default shopSlice.reducer;
