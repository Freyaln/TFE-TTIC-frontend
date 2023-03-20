import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { IAuthErrorPayload } from './authSlices';
export interface IrecipesState {
    randomRecipes: Irecipes[] | null;
    filteredRecipes: Irecipes[] | null;
    searchRecipes: Irecipes[] | null;
    favRecipes: Irecipes[] | null;
    specificRecipes: Irecipes[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IrecipesState = {
    randomRecipes: null,
    filteredRecipes: null,
    searchRecipes: null,
    favRecipes: null,
    specificRecipes: null,
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
        searchRecipes: (state, action: PayloadAction<Irecipes[]>) => {
            state.searchRecipes = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        favRecipes: (state, action: PayloadAction<Irecipes[]>) => {
            state.favRecipes = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        specificRecipes: (state, action: PayloadAction<Irecipes[]>) => {
            state.specificRecipes = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchingFailure: (state, action: PayloadAction<IAuthErrorPayload>) => {
            state.error = action.payload.message;
            state.isLoading = false;
        },
    },
});

export const {
    fetchingStart,
    randomRecipes,
    filteredRecipes,
    searchRecipes,
    favRecipes,
    specificRecipes,
    fetchingFailure,
} = recipesSlice.actions;
export const recipeReducer = recipesSlice.reducer;
