import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null;
  } catch (error) {
    return null;
  }
};

const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
    isAuthenticated: !!getTokenFromStorage(),
    status: "idle",
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      if (action.payload.user && action.payload.token) {
        try {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          localStorage.setItem('token', action.payload.token);
        } catch (error) {
          console.error('Failed to save auth to localStorage:', error);
        }
      }
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Failed to clear auth from localStorage:', error);
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
