import { createSlice } from "@reduxjs/toolkit";

interface CommonProps {
  sidebar: boolean
}

const initialState: CommonProps = {
    sidebar: true
};

export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    saveSidebar: (state, action) => {
        state.sidebar = action.payload;
    }
  },
});

export const {
    saveSidebar
} = CommonSlice.actions;

export default CommonSlice.reducer;
