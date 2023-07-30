import { createSlice } from "@reduxjs/toolkit";

interface CommonProps {
  sidebar: boolean
  coordinates: string
  modalHistory: boolean
}

const initialState: CommonProps = {
    sidebar: true,
    coordinates: '',
    modalHistory: false
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
    },
    saveModalHistory: (state, action) => {
      state.modalHistory = action.payload;
    }
  },
});

export const {
    saveSidebar,
    saveCoordinates,
    saveModalHistory
} = CommonSlice.actions;

export default CommonSlice.reducer;
