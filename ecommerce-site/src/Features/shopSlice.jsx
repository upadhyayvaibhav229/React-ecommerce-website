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
  reducers: {
    // search filter
    // setSearchTerm(state, action) {
    //   state.searchTerm = action.payload;
    // },
    // clearSearchTerm(state) {
    //   state.searchTerm = "";
    // }
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
          state.items.push({
              id: newItem.id,
              title: newItem.title,
              price: newItem.price,
              quantity: 1,
              totalPrice: newItem.price,
          });
      }
      state.totalprice = state.items.reduce((total, item) => total + item.totalPrice, 0);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  },
  removeToCart: (state, action) => {
    const itemId = action.payload;
    const item = state.items.find(item => item.id === itemId);
    if (item && item.quantity > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
    }
    state.totalprice = state.items.reduce((total, item) => total + item.totalPrice, 0);
    state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  },
}
});

export const { setSearchTerm, clearSearchTerm } = shopSlice.actions;

export const selectShop = (state) => state.shop; // Selector to access shop state

export default shopSlice.reducer;
