import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFailure, updateStart, updateDietsForm, updateFavRecipes } from '../slices/updates.slices';
import { IupdateFavRecipesPayload, IupdatePayload, updateApi } from '../services/update.api';
import { authApi } from '../services/auth.api';
import { updateUser } from '../slices/authSlices';

export const updateDietsAction = createAsyncThunk(
    'update',
    async (payload: IupdatePayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(updateStart());
            const updatedDiets = await updateApi.updateDiets(payload);
            dispatch(updateDietsForm(updatedDiets));
            const updateUserInformations = await authApi.updateUserInfo(payload.user);
            dispatch(updateUser(updateUserInformations));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(updateFailure(message));
            return rejectWithValue(message);
        }
    },
);

export const updateAllergiesAction = createAsyncThunk(
    'update',
    async (payload: IupdatePayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(updateStart());
            const updatedAllergies = await updateApi.updateAllergies(payload);
            //dispatch(updateAllergiesForm(updatedAllergies));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(updateFailure(message));
            return rejectWithValue(message);
        }
    },
);

export const addFavRecipesAction = createAsyncThunk(
    'update',
    async (payload: IupdateFavRecipesPayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(updateStart());
            const favRecipes = await updateApi.addFavRecipes(payload);
            console.log(favRecipes);
            dispatch(updateFavRecipes(favRecipes));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            dispatch(updateFailure(message));
            return rejectWithValue(message);
        }
    },
);
