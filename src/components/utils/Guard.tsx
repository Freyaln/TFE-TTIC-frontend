import { FC, useEffect } from 'react';
import { getStorageToken } from './Storage';
import { Navigate } from 'react-router';

type GuardT = 'auth' | 'testingCase';

interface GuardI {
    guards: GuardT;
    target: React.ReactElement;
}
const Guard: FC<GuardI> = ({ guards, target }) => {
    const token = getStorageToken();
    let redirect = null;

    useEffect(() => {
        guards === 'auth' && !token ? (redirect = '/login') : (redirect = '/');
    }, [token, guards]);

    return redirect ? <Navigate to={redirect} /> : target;
};

export default Guard;
