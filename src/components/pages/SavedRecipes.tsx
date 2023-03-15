import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';

const SavedRecipes: FC = ({}) => {
    const recipes = useSelector((state: RootState) => state.update.favRecipes);
    return <div>{/* Add your component implementation here */}</div>;
};

export default SavedRecipes;
