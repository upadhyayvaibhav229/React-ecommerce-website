import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalprice: 0,
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    
    reducers: {
        addToCart(state, action) {
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
    },

})


// export const selectCart = (state) => state.cart.cart; // Selector for cart
// export const removeToCart = (state) => state.cart.removeToCart;
// export const selectProducts = (state) => state.cart.products; // Selector for products
// export const selectTotalPrice = (state) => state.cart.totalprice;
// export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const { addToCart, removeToCart } = cartSlice.actions;
export default cartSlice.reducer;