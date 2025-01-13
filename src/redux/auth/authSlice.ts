import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLogin: boolean;
}

const initialState: AuthState = {
    isLogin: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signSuccess: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {

    },
});

export const { signSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
