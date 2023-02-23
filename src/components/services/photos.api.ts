import { api } from './api.service';
import { IPhotosDefinition } from '../features/MainList';

export const photosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        photos: builder.mutation<IPhotosDefinition[], void>({
            query: () => ({
                url: 'photos?_limit=100',
                method: 'GET',
            }),
        }),
    }),
});

export const { usePhotosMutation } = photosApi;
