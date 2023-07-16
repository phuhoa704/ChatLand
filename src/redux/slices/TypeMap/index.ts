import { createSlice } from "@reduxjs/toolkit";

interface TypeMapProps {
    list: any[]
}

const initialState: TypeMapProps = {
    list: []
};

export const TypeMapSlice = createSlice({
    name: "typemap",
    initialState,
    reducers: {
        saveListTypeMap: (state, action) => {
            state.list = action.payload;
        }
    },
});

export const {
    saveListTypeMap
} = TypeMapSlice.actions;

export default TypeMapSlice.reducer;
