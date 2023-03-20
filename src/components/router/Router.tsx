import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Account from '../pages/Account';
import SavedRecipes from '../pages/SavedRecipes';
import Recipe from '../pages/Recipe';
import WinesGuide from '../pages/Wines-guide';
import Login from '../pages/Login';
import Recovery from '../pages/Recovery';
import Signup from '../pages/Signup';
import App from '../../App';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router';
import { getStorageToken } from '../utils/Storage';
import { reconnectActions } from '../actions/reconnect.action';
import { useEffect } from 'react';
import axios from 'axios';

function IndexRouter() {
    const KEY = process.env.REACT_APP_API_KEY;
    const URL = process.env.REACT_APP_API_URL;
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
                    path: 'recipe/:id/:title',
                    loader: async ({ params }) => {
                        const recipe = await axios.get(`${URL}recipes/${params.id}/information?apiKey=${KEY}`);
                        if (recipe) {
                            console.log(recipe.data);
                            return recipe.data;
                        } else {
                            throw new Error(`Photo with title ${params.title} not found`);
                        }
                    },
                    element: <Recipe />,
                },
                {
                    path: '/wines-guide',
                    element: <WinesGuide />,
                },
            ],
        },
        {
            path: '/account-settings/:username',
            element: <Account />,
        },
        {
            path: '/saved-recipes/:username',
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
