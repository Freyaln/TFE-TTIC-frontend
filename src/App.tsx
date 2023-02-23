import './App.css';
import { configureStore } from '@reduxjs/toolkit';
import Header from './components/features/Header';
import { Outlet } from 'react-router';
import { recipesSlice } from './components/slices/recipesSlices';

export const store = configureStore({
    reducer: {
        recipe: recipesSlice.reducer,
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
