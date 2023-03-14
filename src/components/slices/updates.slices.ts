import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthErrorPayload } from './authSlices';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';

export interface IUpdateState {
    dietsForm: IDietsFormInput | null;
    allergiesForm: IAllergiesFormInput | null;
    areFormsComplete: boolean;
    isupdate: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: IUpdateState = {
    dietsForm: null,
    allergiesForm: null,
    areFormsComplete: false,
    isupdate: false,
    isLoading: false,
    error: null,
};

const updateSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        updateStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateDietsForm(state, action: PayloadAction<IDietsFormInput>) {
            state.dietsForm = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateAllergiesForm(state, action: PayloadAction<IAllergiesFormInput>) {
            state.allergiesForm = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateSuccess: (state) => {
            state.isLoading = false;
        },
        updateFailure: (state, action: PayloadAction<IAuthErrorPayload>) => {
            state.error = action.payload.message;
            state.isLoading = false;
        },
    },
});

export const { updateStart, updateDietsForm, updateAllergiesForm, updateFailure, updateSuccess } = updateSlice.actions;

export const updateReducer = updateSlice.reducer;
