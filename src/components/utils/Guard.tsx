import { FC, useState } from 'react';
import { getStorageToken } from './Storage';
import { Navigate } from 'react-router';

type GuardT = 'auth' | 'testingCase';

interface GuardI {
    guards: GuardT[];
    target: React.ReactElement;
}
const Guard: FC<GuardI> = ({ guards, target }) => {
    const token = getStorageToken();
    const [redirect, setRedirect] = useState<string | null>(null);

    function setUrl(token: string | null) {
        guards.map((i) => (i === 'auth' && token ? setRedirect('/') : setRedirect('/login')));
    }

    return redirect ? <Navigate to={redirect} /> : target;
};

export default Guard;
