import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { fetchingSavedRecipes } from '../actions/fetching.action';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';
import { removeFavRecipesAction } from '../actions/update.action';

const SavedRecipes: FC = ({}) => {
    const maxWidth = 0.95 * screen.width;
    const isMobile = screen.width < 450;
    const fav = useSelector((state: RootState) => state.auth.user?.fav_recipes_id);
    const user = useSelector((state: RootState) => state.auth.user);
    const recipes: Irecipes[] | null = useSelector((state: RootState) => state.recipe.favRecipes);
    const dispatch = useDispatch();

    const handleFavorites = (element: number) => {
        const recipeId = element.toString();
        const userId = user!.id;
        dispatch(removeFavRecipesAction({ userId: userId, recipeId: recipeId }) as any);
    };

    useEffect(() => {
        fav && dispatch(fetchingSavedRecipes(fav) as any);
    }, [fav]);

    return (
        <Box>
            <Typography
                variant="h2"
                fontSize="1.5rem"
                sx={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 'bolder',
                    textAlign: 'center',
                    marginTop: '1rem',
                    textDecoration: 'underline',
                    textUnderlineOffset: '0.25rem',
                }}
            >
                Your favourites recipes
            </Typography>
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
                                            <StarRateIcon />
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

export default SavedRecipes;
