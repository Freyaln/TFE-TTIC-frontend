import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPhotosDefinition } from '../features/MainList';

export interface IPhotosState {
    photos: IPhotosDefinition[];
}

const initialState: IPhotosState = {
    photos: [],
};

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotosDatas: (state, action: PayloadAction<IPhotosDefinition[]>) => {
            state.photos = action.payload;
        },
    },
});

export const { setPhotosDatas } = photosSlice.actions;
export default photosSlice.reducer;
