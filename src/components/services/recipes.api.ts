import { Irecipes } from '../../interfaces/recipesInterfaces';
import axios from 'axios';
import { IUser } from './auth.api';

const KEY = process.env.REACT_APP_API_KEY;
const URL = process.env.REACT_APP_API_URL;
export async function getRandomRecipe(): Promise<Irecipes[]> {
    const response = await fetch(`${URL}recipes/random?apiKey=${KEY}&number=50`);
    const data = await response.json();
    return data.recipes;
}

export const recipesApi = {
    fetchFiltered: async (payload: { user: IUser; page: number; count: number }) => {
        const offset = payload.page;
        const number = payload.count;
        const userDiets = payload.user?.diets || {};
        const userAllergies = payload.user?.allergies || {};
        const activeDiets = Object.entries(userDiets).filter(([key, value]) => value);
        const activeAllergies = Object.entries(userAllergies).filter(([key, value]) => value);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (activeDiets.length === 0) {
            throw new Error('No diets found');
        } else {
            const diets = activeDiets.map(([key]) => key).join('|');
            const allergies = activeAllergies.map(([key]) => key).join(',');
            const response = await axios.get(
                `${URL}recipes/complexSearch?apiKey=${KEY}&diet=${diets}&intolerances=${allergies}&number=${number}&offset=${offset}`,
                config,
            );
            return response.data.results;
        }
    },

    fetchRandom: async () => {
        const response = await axios.get(`${URL}recipes/random?apiKey=${KEY}&number=50`);
        return response.data.results;
    },
    fetchSearched: async (query: string) => {
        const response = await axios.get(`${URL}recipes/complexSearch?apiKey=${KEY}&number=10&query=${query}`);
        return response.data.results;
    },
    fetchFavRecipes: async (id: string[] | string) => {
        const recipe = await axios.get(`${URL}recipes/informationBulk?apiKey=${KEY}&ids=${id}`);

        if (recipe) {
            return recipe.data;
        } else {
            throw new Error(`recipe not found`);
        }
    },
    fetchSpecificRecipes: async (id: string) => {
        const recipe = await axios.get(`${URL}recipes/informationBulk?apiKey=${KEY}&ids=${id}`);

        if (recipe) {
            return recipe.data;
        } else {
            throw new Error(`recipe not found`);
        }
    },
};
