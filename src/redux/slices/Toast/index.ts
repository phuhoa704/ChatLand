import { createSlice } from "@reduxjs/toolkit";

interface ToastProps {
    show: boolean
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
}

const initialState: ToastProps = {
    show: false,
    severity: 'success',
    summary: '',
    detail: ''
};

export const ToastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.show = true;
            state.severity = action.payload.severity;
            state.summary = action.payload.summary;
            state.detail = action.payload.detail;
        },
        hideToast: (state) => initialState
    },
});

export const {
    showToast, hideToast
} = ToastSlice.actions;

export default ToastSlice.reducer;
