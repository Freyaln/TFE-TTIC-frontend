import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthErrorPayload } from './authSlices';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';

export interface IRegisterCredentialsForm {
    email: string;
    username: string;
    password: string;
}
export interface IRegisterState {
    forms: {
        credentialForm: IRegisterCredentialsForm | null;
        dietsForm: IDietsFormInput | null;
        allergiesForm: IAllergiesFormInput | null;
    };
    areFormsComplete: boolean;
    isRegister: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: IRegisterState = {
    forms: {
        credentialForm: null,
        dietsForm: null,
        allergiesForm: null,
    },
    areFormsComplete: false,
    isRegister: false,
    isLoading: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerCredentialForm(state, action: PayloadAction<IRegisterCredentialsForm>) {
            state.forms.credentialForm = action.payload;
        },
        registerDietsForm(state, action: PayloadAction<IDietsFormInput>) {
            state.forms.dietsForm = action.payload;
        },
        registerAllergiesForm(state, action: PayloadAction<IAllergiesFormInput>) {
            state.forms.allergiesForm = action.payload;
        },
        registerSuccess: (state) => {
            state.isLoading = false;
        },
        registerFailure: (state, action: PayloadAction<IAuthErrorPayload>) => {
            state.error = action.payload.message;
            state.isLoading = false;
        },
    },
});

export const {
    registerStart,
    registerCredentialForm,
    registerDietsForm,
    registerAllergiesForm,
    registerFailure,
    registerSuccess,
} = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
