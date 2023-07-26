import { createSlice } from "@reduxjs/toolkit";

interface CommonProps {
  sidebar: boolean
  coordinates: string
}

const initialState: CommonProps = {
    sidebar: true,
    coordinates: ''
};

export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    saveSidebar: (state, action) => {
        state.sidebar = action.payload;
    },
    saveCoordinates: (state, action) => {
      state.coordinates = action.payload;
    }
  },
});

export const {
    saveSidebar,
    saveCoordinates
} = CommonSlice.actions;

export default CommonSlice.reducer;
