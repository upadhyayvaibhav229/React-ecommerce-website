// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Fetch current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/users/current-user`, {
        credentials: "include", // send cookies
      });
      const data = await res.json();

      if (!res.ok) {
        // 🔹 Try refreshing if unauthorized
        if (res.status === 401) {
          const refreshed = await fetch(`${backendUrl}/api/v1/users/refresh-token`, {
            method: "POST",
            credentials: "include",
          });
          const refreshData = await refreshed.json();

          if (refreshed.ok) {
            // retry current user after refresh
            const retry = await fetch(`${backendUrl}/api/v1/users/current-user`, {
              credentials: "include",
            });
            const retryData = await retry.json();
            if (retry.ok) return retryData.data;
          }
        }
        return rejectWithValue(data.message || "Not authenticated");
      }

      return data.data; // { user }
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// ✅ Update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/users/update-user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // include cookies for auth
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Update failed");

      return data.data; // 👈 updated user object
    } catch (err) {
      return rejectWithValue(err.message || "Update failed");
    }
  }
);


// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Login failed");
      return data.data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        // credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Registration failed");
      return data.data.user; // 👈 we don’t store this in state (only use for toast / redirect)
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

// ✅ Logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return rejectWithValue("Logout failed");
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: false, // logged in or not
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.status = false;
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Register user (no auto-login after signup)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        // ❌ don’t set user/status here → user must login manually
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // merge old + new
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });



  },
});

export default authSlice.reducer;
