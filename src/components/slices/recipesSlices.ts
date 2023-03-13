import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { IAuthErrorPayload } from './authSlices';
import { IUser } from '../services/auth.api';
export interface IrecipesState {
    randomRecipes: Irecipes[] | null;
    filteredRecipes: Irecipes[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IrecipesState = {
    randomRecipes: null,
    filteredRecipes: null,
    isLoading: false,
    error: null,
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        fetchingStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        randomRecipes: (state, action: PayloadAction<Irecipes[]>) => {
            state.randomRecipes = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        filteredRecipes: (state, action: PayloadAction<Irecipes[]>) => {
            state.filteredRecipes = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchingFailure: (state, action: PayloadAction<IAuthErrorPayload>) => {
            state.error = action.payload.message;
            state.isLoading = false;
        },
    },
});

export const { fetchingStart, randomRecipes, filteredRecipes, fetchingFailure } = recipesSlice.actions;
export const recipeReducer = recipesSlice.reducer;
