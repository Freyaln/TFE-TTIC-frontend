import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Irecipes } from '../../interfaces/recipesInterfaces';
export interface IrecipesState {
    recipe: Irecipes[];
}

const initialState: IrecipesState = {
    recipe: [],
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRandomRecipesDatas: (state, action: PayloadAction<Irecipes[]>) => {
            state.recipe = action.payload;
        },
    },
});

export const { setRandomRecipesDatas } = recipesSlice.actions;
export const recipeReducer = recipesSlice.reducer;
