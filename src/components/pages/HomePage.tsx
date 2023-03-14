import { FC, useEffect } from 'react';
import MainList from '../features/MainList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { fetchingUserFilteredActions } from '../actions/fetching.action';

const HomePage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        dispatch(fetchingUserFilteredActions(user!) as any);
    }, [user]);

    return (
        <>
            <MainList />
        </>
    );
};

export default HomePage;
