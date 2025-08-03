import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../utils";

export const loginUser = createAsyncThunk("auth/loginUser", async (formData, thunkAPI) => {
  try {
    const res = await API.post("/login", formData); // ← backend endpoint
    return res.data.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});


export const getCurrentUser = createAsyncThunk('/current_user', async (_, thunkAPI) => {
    try {
        const res = API.get("/current_user");
        return res.data.data
    } catch (error) {
        
    }
})

const intialState = {
    status: false,
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    intialState,
    reducers: {
        logout: (state)=>{
            state.status = false;
            state.user = null;
        }
    },

    
})