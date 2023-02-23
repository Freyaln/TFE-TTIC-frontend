import { Irecipes } from '../../interfaces/recipesInterfaces';

const KEY = process.env.REACT_APP_API_KEY;
const URL = process.env.REACT_APP_API_URL;

export async function getRandomRecipe(): Promise<Irecipes[]> {
    const response = await fetch(`${URL}recipes/random?apiKey=${KEY}&number=50`);
    const data = await response.json();
    return data.recipes;
}
