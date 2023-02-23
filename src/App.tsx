import './App.css';
import { configureStore } from '@reduxjs/toolkit';
import { photosSlice } from './components/slices/recipesSlices';
import { api } from './components/services/api.service';
import Header from './components/features/Header';
import { Outlet } from 'react-router';

export const store = configureStore({
    reducer: {
        photos: photosSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
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
