import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toast: {
      message: "",
      isVisible: false
    }
  },
  reducers: {
    showToast: (state, action) => {
      state.toast.message = action.payload;
      state.toast.isVisible = true;
    },
    hideToast: (state) => {
      state.toast.isVisible = false;
      state.toast.message = "";
    }
  }
});

export const { showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
