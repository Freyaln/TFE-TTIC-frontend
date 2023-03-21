import { FC, useEffect } from 'react';
import MainList from '../features/MainList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { fetchingUserFilteredActions } from '../actions/fetching.action';
import Pagination from '../features/Pagination';

const HomePage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const page = useSelector((state: RootState) => state.recipe.page);
    const count = useSelector((state: RootState) => state.recipe.count);
    useEffect(() => {
        dispatch(fetchingUserFilteredActions({ user: user!, page: page, count: count }) as any);
    }, [user, page, count]);

    return (
        <>
            <MainList />
            <Pagination />
        </>
    );
};

export default HomePage;
