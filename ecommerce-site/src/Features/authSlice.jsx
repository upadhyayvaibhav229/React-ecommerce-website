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

    extraReducers:(builder)=> {
      builder
        .addCase(loginUser.pending, (state)=>{
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state)=>{
          state.loading = false;
          state.status = true;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state)=>{
          state.loading = false;
          state.status = false;
          state.error = action.payload;
        })
        .addCase(getCurrentUser.fulfilled, (state)=>{
          state.status = true;
          state.user = action.payload;
        });
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;