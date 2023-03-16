import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { fetchingSavedRecipes } from '../actions/fetching.action';

const SavedRecipes: FC = ({}) => {
    const recipes = useSelector((state: RootState) => state.auth.user?.fav_recipes_id);
    const fav = useSelector((state: RootState) => state.recipe.favRecipes);
    const dispatch = useDispatch();
    console.log(fav);

    useEffect(() => {
        recipes && recipes.map((element) => dispatch(fetchingSavedRecipes(element) as any));
    }, [recipes]);

    return <div></div>;
};

export default SavedRecipes;
