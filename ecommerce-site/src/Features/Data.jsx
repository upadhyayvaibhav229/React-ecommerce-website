import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/frontend_assets/products";

export const data = createSlice({
    name: "data",
    initialState: {
        products: products
    },
    // The `reducers` field lets us define reducers and generate associated actions
    // for used of products data
    
    reducers: {
        +
    }
})

export default data.reducer