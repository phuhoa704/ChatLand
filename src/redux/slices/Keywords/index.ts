import { createSlice } from "@reduxjs/toolkit";

interface Keyword {
    Id: number,
    Key: string,
    Value: string,
    CreatedAt: string,
    UpdatedAt: string
}

interface KeywordProps {
    list: Keyword[]
}

const initialState: KeywordProps = {
    list: []
};

export const KeywordSlice = createSlice({
    name: "keyword",
    initialState,
    reducers: {
        saveListKeyword: (state, action) => {
            state.list = action.payload;
        }
    },
});

export const {
    saveListKeyword
} = KeywordSlice.actions;

export default KeywordSlice.reducer;
