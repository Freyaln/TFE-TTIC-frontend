import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../services/auth.api';

export interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    isUpdated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface IAuthErrorPayload {
    message: string;
}

const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    isUpdated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<IAuthErrorPayload>) => {
            state.error = action.payload.message;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isUpdated = true;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
