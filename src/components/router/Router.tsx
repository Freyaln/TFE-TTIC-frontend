import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Account from '../pages/Account';
import SavedRecipes from '../pages/SavedRecipes';
import Recipe from '../pages/Recipe';
import Wines from '../pages/Wines';
import Login from '../pages/Login';
import Recovery from '../pages/Recovery';
import Signup from '../pages/Signup';
import App from '../../App';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { IrecipesState } from '../slices/recipesSlices';
import Guard from '../utils/Guard';

function IndexRouter() {
    // TODO FIX THIS ERROR
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const recipes = useSelector((state: IrecipesState) => state.recipe['recipe']);
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Guard target={<App />} guards={['auth']} />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'recipe/:title',
                    loader: async ({ params }) => {
                        const recipe = recipes.find((i: Irecipes) => i.title.toString() === params.title);
                        if (recipe) {
                            return recipe;
                        } else {
                            throw new Error(`Photo with title ${params.title} not found`);
                        }
                    },
                    element: <Recipe />,
                },
                {
                    path: '/wines-guide',
                    element: <Wines />,
                },
            ],
        },
        {
            path: '/account-settings/:username',
            element: <Account />,
        },
        {
            path: '/saved-recipes',
            element: <SavedRecipes />,
        },
        {
            path: '/login',
            element: <Login />,
            children: [
                {
                    path: 'login/password-recovery',
                    element: <Recovery />,
                },
            ],
        },
        {
            path: '/account-creation',
            element: <Signup />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default IndexRouter;
