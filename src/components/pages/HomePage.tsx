import { FC } from 'react';
import MainList from '../features/MainList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { fetchingRandomActions, fetchingUserFilteredActions } from '../actions/userFilteredRecipes.action';

const HomePage: FC = ({}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    if (user) {
        dispatch(fetchingUserFilteredActions(user) as any);
    } else {
        dispatch(fetchingRandomActions(null) as any);
    }
    return (
        <>
            <MainList />
        </>
    );
};

export default HomePage;
