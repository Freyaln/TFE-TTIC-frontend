import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginFailure, loginStart, loginSuccess } from '../slices/authSlices';
import { authApi } from '../services/auth.api';

interface IReconnectPayload {
    token: string;
}
export const reconnectActions = createAsyncThunk(
    'auth/login',
    async (payload: IReconnectPayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(loginStart());
            const user = await authApi.reconnectSession(payload);
            dispatch(loginSuccess(user));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(loginFailure({ message }));
            return rejectWithValue(message);
        }
    },
);
