import { createSlice } from "@reduxjs/toolkit";

interface AuthProps {
    token: string
    user: any
}

const initialState: AuthProps = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInBob25lIjoiMjAyMyIsImlhdCI6MTY4NjcxNDQxMSwiZXhwIjoxNjg4MDEwNDExfQ.siegdzRjfPzLDYucvbD4tGavxMDYfOJMjN2D3bDVnac',
    user: {}
};

export const AuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveToken: (state, action) => {
            state.token = action.payload;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const {
    saveToken,
    saveUser
} = AuthSlice.actions;

export default AuthSlice.reducer;
