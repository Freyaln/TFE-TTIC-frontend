import { clearStorageToken, setStorageToken } from '../utils/Storage';
import axios from 'axios';

export interface IUser {
    username: string;
    id: string;
}

export interface ILoginResponse {
    user: IUser;
    token: string;
}

export const authApi = {
    login: async (payload: { email: string; password: string; remember: boolean }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            email: payload.email,
            password: payload.password,
        };
        const response = await axios.post(
            'http://localhost:5000/auth/login',
            { email: data.email, password: data.password },
            config,
        );
        const { username, id, token } = response.data;
        const user = { username, id };
        setStorageToken(token, payload.remember);
        return user;
    },
    logout: async () => {
        clearStorageToken();
    },
};
