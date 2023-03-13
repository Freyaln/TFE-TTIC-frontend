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
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { getStorageToken } from '../utils/Storage';
import { reconnectActions } from '../actions/reconnect.action';
import { useEffect } from 'react';
import { RootState } from '../utils/store';

function IndexRouter() {
    const recipes = useSelector((state: RootState) => state.recipe.filteredRecipes);
    const dispatch = useDispatch();
    const token = getStorageToken();
    useEffect(() => {
        if (token) {
            dispatch(reconnectActions({ token }) as any);
        }
    }, [token]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: token ? <App /> : <Login />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'recipe/:title',
                    loader: async ({ params }) => {
                        const recipe = recipes!.find((i: Irecipes) => i.title.toString() === params.title);
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
