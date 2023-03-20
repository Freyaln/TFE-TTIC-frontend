import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchingStart,
    fetchingFailure,
    filteredRecipes,
    randomRecipes,
    searchRecipes,
    favRecipes,
    specificRecipes,
} from '../slices/recipesSlices';
import { recipesApi } from '../services/recipes.api';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { IUser } from '../services/auth.api';

export const fetchingUserFilteredActions = createAsyncThunk(
    'fetch',
    async (payload: IUser, { dispatch, rejectWithValue }) => {
        try {
            dispatch(fetchingStart());
            const data: Irecipes[] = await recipesApi.fetchFiltered(payload);
            dispatch(filteredRecipes(data));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(fetchingFailure({ message }));
            return rejectWithValue(message);
        }
    },
);

export const fetchingRandomActions = createAsyncThunk('fetch', async (payload: null, { dispatch, rejectWithValue }) => {
    try {
        dispatch(fetchingStart());
        const data: Irecipes[] = await recipesApi.fetchRandom();
        dispatch(randomRecipes(data));
    } catch (error: any) {
        const message = error.response?.data?.message || 'Something went wrong';
        dispatch(fetchingFailure({ message }));
        return rejectWithValue(message);
    }
});

export const fetchingSearchedQuery = createAsyncThunk(
    'fetch',
    async (payload: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(fetchingStart());
            const data: Irecipes[] = await recipesApi.fetchSearched(payload);
            dispatch(searchRecipes(data));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(fetchingFailure({ message }));
            return rejectWithValue(message);
        }
    },
);

export const fetchingSavedRecipes = createAsyncThunk(
    'fetch',
    async (payload: string[] | string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(fetchingStart());
            const data: Irecipes[] = await recipesApi.fetchFavRecipes(payload);
            dispatch(favRecipes(data));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(fetchingFailure({ message }));
            return rejectWithValue(message);
        }
    },
);

export const fetchingSpecificRecipes = createAsyncThunk(
    'fetch',
    async (payload: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(fetchingStart());
            const data: Irecipes[] = await recipesApi.fetchSpecificRecipes(payload);
            dispatch(specificRecipes(data));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(fetchingFailure({ message }));
            return rejectWithValue(message);
        }
    },
);
