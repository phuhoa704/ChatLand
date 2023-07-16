import React from "react";

import { createSlice } from "@reduxjs/toolkit";

interface loadingView {
  loading: boolean
}

const initialState: loadingView = {
  loading: false
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true
    },

    hideLoading: (state) => {
      state.loading = false
    }
  },
});

export const {
  showLoading,
  hideLoading
} = LoadingSlice.actions;

export default LoadingSlice.reducer;
