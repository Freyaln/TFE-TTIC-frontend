import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import '../../index.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { RootState } from '../utils/store';
import { useEffect, useState } from 'react';
import { addFavRecipesAction, removeFavRecipesAction } from '../actions/update.action';

const HomeList: React.FC = ({}) => {
    const [recipes, setRecipes] = useState<Irecipes[] | null>([]);
    const maxWidth = 0.95 * screen.width;
    const isMobile = screen.width < 450;
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const filteredRecipes = useSelector((state: RootState) => state.recipe.filteredRecipes);
    const searchRecipes = useSelector((state: RootState) => state.recipe.searchRecipes);

    const handleFavorites = (element: number) => {
        const recipeId = element.toString();
        const userId = user!.id;
        user && user.fav_recipes_id!.find((elem) => elem === element.toString())
            ? dispatch(removeFavRecipesAction({ userId: userId, recipeId: recipeId }) as any)
            : dispatch(addFavRecipesAction({ userId: userId, recipeId: recipeId }) as any);
    };

    useEffect(() => {
        if (searchRecipes != null) {
            setRecipes(searchRecipes);
        } else {
            setRecipes(filteredRecipes);
        }
    }, [searchRecipes, filteredRecipes]);

    return (
        <Box>
            {recipes && (
                <ImageList
                    cols={isMobile ? 1 : 2}
                    className={isMobile ? 'image_list--container--mobile' : 'image_list--container--desktop'}
                >
                    {recipes &&
                        recipes.map((i: Irecipes) => (
                            <ImageListItem key={i.id}>
                                <Link to={`/recipe/${i.id}/${i.title}`}>
                                    <img src={`${i.image}?w=300&fit=crop&auto=format`} alt={i.title} loading="lazy" />
                                </Link>
                                <ImageListItemBar
                                    title={i.title}
                                    className="image_list--list_item_text"
                                    actionIcon={
                                        <IconButton
                                            className="image_list--list_item_icon"
                                            onClick={() => handleFavorites(i.id)}
                                        >
                                            {user &&
                                            user.fav_recipes_id!.find((element) => element === i.id.toString()) ? (
                                                <StarRateIcon />
                                            ) : (
                                                <StarOutlineIcon />
                                            )}
                                        </IconButton>
                                    }
                                ></ImageListItemBar>
                            </ImageListItem>
                        ))}
                </ImageList>
            )}
        </Box>
    );
};
export default HomeList;
