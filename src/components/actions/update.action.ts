import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFailure, updateStart } from '../slices/updates.slices';
import { IupdatePayload, updateApi } from '../services/update.api';

export const updateDietsAction = createAsyncThunk(
    'update',
    async (payload: IupdatePayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(updateStart());
            const updatedDiets = await updateApi.updateDiets(payload);
            console.log(updatedDiets);
            //dispatch(updateDietsForm(updatedDiets));
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
