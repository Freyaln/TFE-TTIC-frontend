import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
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
                    sx={
                        isMobile
                            ? {
                                  justifyItems: 'center',
                                  width: maxWidth,
                                  height: 'auto',
                                  margin: '0 auto',
                                  marginTop: '1rem',
                              }
                            : { width: maxWidth, height: 'auto', margin: '0 auto', marginTop: '1rem' }
                    }
                >
                    {recipes &&
                        recipes.map((i: Irecipes) => (
                            <ImageListItem key={i.id}>
                                <Link to={`/recipe/${i.id}/${i.title}`}>
                                    <img src={`${i.image}?w=300&fit=crop&auto=format`} alt={i.title} loading="lazy" />
                                </Link>
                                <ImageListItemBar
                                    title={i.title}
                                    sx={{ fontSize: '0.75rem' }}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'yellow', marginRight: '1rem' }}
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
