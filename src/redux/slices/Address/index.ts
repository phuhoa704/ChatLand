import { createSlice } from "@reduxjs/toolkit";

interface AddressProps {
    provinces: any[],
    districts: any[],
    wards: any[]
}

const initialState: AddressProps = {
    provinces: [],
    districts: [],
    wards: []
};

export const AddressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        saveProvinces: (state, action) => {
            state.provinces = action.payload;
        },
        saveDistricts: (state, action) => {
            state.districts = action.payload;
        },
        saveWards: (state, action) => {
            state.wards = action.payload;
        }
    },
});

export const {
    saveProvinces,
    saveDistricts,
    saveWards
} = AddressSlice.actions;

export default AddressSlice.reducer;
