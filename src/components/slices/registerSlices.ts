import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreationFormInput } from '../features/forms/CreationForm';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';
export interface IregisterForm {
    creationForm: ICreationFormInput;
    dietsForm: IDietsFormInput;
    allergiesForm: IAllergiesFormInput;
}

const initialState: IregisterForm = {
    creationForm: { email: '', password: '', confirmPassword: '', username: '' },
    dietsForm: { gluten_free: false, vegetarian: false, vegan: false, pescetarian: false, paleo: false },
    allergiesForm: {
        dairy: false,
        egg: false,
        gluten: false,
        grain: false,
        peanut: false,
        seafood: false,
        sesame: false,
        shellfish: false,
        soy: false,
        sulfite: false,
        tree_nut: false,
        wheat: false,
    },
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        updateCreationForm(state, action: PayloadAction<ICreationFormInput>) {
            state.creationForm = action.payload;
        },
        updateDietsForm(state, action: PayloadAction<IDietsFormInput>) {
            state.dietsForm = action.payload;
        },
        updateAllergiesForm(state, action: PayloadAction<IAllergiesFormInput>) {
            state.allergiesForm = action.payload;
        },
    },
});

export const { updateCreationForm, updateDietsForm, updateAllergiesForm } = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
