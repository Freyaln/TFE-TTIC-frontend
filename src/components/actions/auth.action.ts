import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginFailure, loginStart, loginSuccess } from '../slices/authSlices';
import { authApi } from '../services/auth.api';

interface ILoginPayload {
    email: string;
    password: string;
    remember: boolean;
}
export const authActions = createAsyncThunk(
    'auth/login',
    async (payload: ILoginPayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(loginStart());
            const user = await authApi.login(payload);
            dispatch(loginSuccess(user));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(loginFailure({ message }));
            return rejectWithValue(message);
        }
    },
);
