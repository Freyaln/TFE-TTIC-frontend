import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomRecipe } from '../services/recipes.api';
import { useQuery } from 'react-query';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { setRandomRecipesDatas } from '../slices/recipesSlices';

const HomeList: React.FC = ({}) => {
    const dispatch = useDispatch();
    const maxWidth = 0.95 * screen.width;
    const { data } = useQuery('randomRecipe', getRandomRecipe);
    // TODO FIX THIS ERROR
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const recipe = useSelector((state: Irecipes) => state.recipe['recipe']);
    useEffect(() => {
        dispatch(setRandomRecipesDatas(data!));
    }, [dispatch, data]);

    console.log(recipe);
    return (
        <Box>
            {recipe && (
                <ImageList cols={2} sx={{ width: maxWidth, height: 'auto', margin: '0 auto', marginTop: '1rem' }}>
                    {recipe.map((i: Irecipes) => (
                        <ImageListItem key={i.id}>
                            <Link to={`/recipe/${i.title}`}>
                                <img src={`${i.image}?w=248&fit=crop&auto=format`} alt={i.title} loading="lazy" />
                            </Link>
                            <ImageListItemBar title={i.title} sx={{ fontSize: '0.75rem' }}></ImageListItemBar>
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    );
};
export default HomeList;
