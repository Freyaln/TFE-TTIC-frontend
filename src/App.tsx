import './App.css';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Header from './components/features/Header';
import { Outlet } from 'react-router';
import { recipeReducer } from './components/slices/recipesSlices';
import { registerReducer } from './components/slices/registerSlices';

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        register: registerReducer,
    },
});

function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
