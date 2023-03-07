import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';
import { IRegisterCredentialsForm, registerFailure, registerStart, registerSuccess } from '../slices/registerSlices';
import { registerApi } from '../services/register.api';

interface IRegisterPayload {
    credentialForm: IRegisterCredentialsForm | null;
    dietsForm: IDietsFormInput | null;
    allergiesForm: IAllergiesFormInput | null;
}
export const registerAction = createAsyncThunk(
    'register',
    async (payload: IRegisterPayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(registerStart());
            const user = await registerApi.register(payload);
            dispatch(registerSuccess());
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(registerFailure(message));
            return rejectWithValue(message);
        }
    },
);
