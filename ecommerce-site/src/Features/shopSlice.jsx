import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/frontend_assets/products";


const initialState = {
  products: products, //Importing the products array
   currency: "₹",
  deliveryFee: 10,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // search filter
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = "";
    }
  },
});

export const { setSearchTerm, clearSearchTerm } = shopSlice.actions;

export const selectShop = (state) => state.shop; // Selector to access shop state

export default shopSlice.reducer;
