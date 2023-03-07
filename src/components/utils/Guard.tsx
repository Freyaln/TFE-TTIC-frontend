import { FC, useEffect } from 'react';
import { getStorageToken } from './Storage';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from './store';

type GuardT = 'auth' | 'testingCase';

interface GuardI {
    guards: GuardT[];
    target: React.ReactElement;
}
const Guard: FC<GuardI> = ({ guards, target }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const token = getStorageToken();
    let redirect = null;

    useEffect(() => {
        for (let i = 0; i < guards.length; i++) {
            switch (guards[i]) {
                case 'auth':
                    if (user && token) {
                        redirect = '/';
                    } else {
                        redirect = 'login';
                    }
                    break;
                default:
                    break;
            }
        }
    }, [user]);

    return redirect ? <Navigate to={redirect} /> : target;
};

export default Guard;
