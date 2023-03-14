import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authSlices';
import { recipeReducer } from '../slices/recipesSlices';
import { registerReducer } from '../slices/registerSlices';
import { updateReducer } from '../slices/updates.slices';

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        register: registerReducer,
        auth: authReducer,
        update: updateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
