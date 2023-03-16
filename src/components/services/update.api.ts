import axios from 'axios';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';

export interface IupdatePayload {
    user: string;
    diets?: IDietsFormInput;
    allergies?: IAllergiesFormInput;
}

export interface IupdateFavRecipesPayload {
    userId: string;
    recipeId: string;
}

export const updateApi = {
    updateDiets: async (payload: IupdatePayload) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            id: payload.user,
            diets: payload.diets,
        };
        const response = await axios.post(
            'http://localhost:5000/auth/changediets',
            { id: data.id, diets: data.diets },
            config,
        );
        return response.data;
    },
    updateAllergies: async (payload: IupdatePayload) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            id: payload.user,
            allergies: payload.allergies,
        };
        const response = await axios.post(
            'http://localhost:5000/auth/changeallergies',
            {
                id: data.id,
                allergies: data.allergies,
            },
            config,
        );
        return response;
    },
    addFavRecipes: async (payload: IupdateFavRecipesPayload) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            userId: payload.userId,
            recipeId: payload.recipeId,
        };
        const response = await axios.post(
            'http://localhost:5000/recipe/add',
            { userId: data.userId, recipeId: data.recipeId },
            config,
        );
        return response.data;
    },
};
