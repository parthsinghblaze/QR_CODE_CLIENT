import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface AuthState {
    isLogin: boolean;
}

const initialState: AuthState = {
    isLogin: false,
};


export const validateToken = createAsyncThunk<User[], void, { rejectValue: string }>(
    "auth/validateToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/validate-admin");
            return response.data; // Assuming response.data is an array of users
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);


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
