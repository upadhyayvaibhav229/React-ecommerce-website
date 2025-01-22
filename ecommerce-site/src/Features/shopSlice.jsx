import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/frontend_assets/products";


const initialState = {
  products: products, // Importing the products array
  currency: "₹",
  deliveryFee: 10,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // You can add reducers here if needed for future functionality
  },
});

export const selectShop = (state) => state.shop; // Selector to access shop state

export default shopSlice.reducer;
