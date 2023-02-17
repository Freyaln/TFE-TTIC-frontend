import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Account from '../pages/Account';
import SavedRecipes from '../pages/SavedRecipes';
import Recipe from '../pages/Recipe';
import Wines from '../pages/Wines';
import Login from '../pages/Login';
import Recovery from '../pages/Recovery';
import Signup from '../pages/Signup';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route index element={<Recipe />} />
                <Route path="/wines-guide" element={<Wines />} />
            </Route>
            <Route path="/account-settings" element={<Account />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            {/*<Route path="/login" element={<Login />}>*/}
            {/*    <Route path="/password-recovery" element={<Recovery />} />*/}
            {/*    <Route path="/account-creation" element={<Signup />} />*/}
            {/*</Route>*/}
        </Routes>
    );
}

export default Router;
