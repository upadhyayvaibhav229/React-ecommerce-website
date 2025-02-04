import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  totalprice: 0,
  totalQuantity: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      if (!newItem.selectedSize) {
        toast.error("Please select a size");
        return;
      }

      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cart.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          selectedSize: newItem.selectedSize,
          image: newItem.image
        });
      }

      state.totalprice = state.cart.reduce((total, item) => total + item.totalPrice, 0);
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

      console.log("Cart Items:", state.cart);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.price;
      }
      state.totalprice = state.cart.reduce((total, item) => total + item.totalPrice, 0);
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      const item = state.cart.find(item => item.id === itemId);

      if (item && item.quantity > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
      }

      state.totalprice = state.cart.reduce((total, item) => total + item.totalPrice, 0);
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
});


export const getCartCount = (state) => {
  return state.cart.cart.reduce((count, item) => count + item.quantity, 0);
};

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
