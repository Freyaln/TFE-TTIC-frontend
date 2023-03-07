import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authSlices';
import { recipeReducer } from '../slices/recipesSlices';
import { registerReducer } from '../slices/registerSlices';

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        register: registerReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
