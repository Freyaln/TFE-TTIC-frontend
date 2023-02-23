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
import { IPhotosState } from '../slices/recipesSlices';
import { RouterProvider } from 'react-router';
import React from 'react';
import { IPhotosDefinition } from '../features/MainList';

function IndexRouter() {
    // TODO FIX THIS ERROR
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const photos = useSelector((state: IPhotosState) => state.photos['photos']);
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'recipe/:title',
                    loader: async ({ params }) => {
                        const photo = photos.find((i: IPhotosDefinition) => i.title.toString() === params.title);
                        if (photo) {
                            return photo;
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
            path: '/account-settings',
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
                {
                    path: 'login/account-creation',
                    element: <Signup />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default IndexRouter;
