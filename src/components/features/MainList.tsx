import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import { RootState } from '../utils/store';
import { useEffect, useState } from 'react';

const HomeList: React.FC = ({}) => {
    const [recipes, setRecipes] = useState<Irecipes[] | null>([]);
    const maxWidth = 0.95 * screen.width;
    const filteredRecipes = useSelector((state: RootState) => state.recipe.filteredRecipes);
    const searchRecipes = useSelector((state: RootState) => state.recipe.searchRecipes);

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
                <ImageList cols={2} sx={{ width: maxWidth, height: 'auto', margin: '0 auto', marginTop: '1rem' }}>
                    {recipes &&
                        recipes.map((i: Irecipes) => (
                            <ImageListItem key={i.id}>
                                <Link to={`/recipe/${i.id}/${i.title}`}>
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
