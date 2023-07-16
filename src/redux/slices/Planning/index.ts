import { createSlice } from "@reduxjs/toolkit";

interface PlanningProps {
    list: any[],
    postById: any,
    readData: any
}

const initialState: PlanningProps = {
    list: [],
    postById: {},
    readData: {}
};

export const PlanningSlice = createSlice({
    name: "planning",
    initialState,
    reducers: {
        saveListPlanning: (state, action) => {
            state.list = action.payload;
        },
        savePostById: (state, action) => {
            state.postById = action.payload;
        },
        saveReadData: (state, action) => {
            state.readData = action.payload;
        }
    },
});

export const {
    saveListPlanning,
    savePostById,
    saveReadData
} = PlanningSlice.actions;

export default PlanningSlice.reducer;
