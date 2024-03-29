import { clearStorageToken, setStorageToken } from '../utils/Storage';
import axios from 'axios';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';

export interface IUser {
    username: string;
    id: string;
    diets?: IDietsFormInput;
    allergies?: IAllergiesFormInput;
    fav_recipes_id: string[] | null;
}

export const authApi = {
    login: async (payload: {
        email: string;
        password: string;
        diets?: IDietsFormInput;
        allergies?: IAllergiesFormInput;
        remember: boolean;
    }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            email: payload.email,
            password: payload.password,
            diets: payload.diets,
            allergies: payload.allergies,
        };
        const response = await axios.post(
            'http://localhost:5000/auth/login',
            { email: data.email, password: data.password, diets: data.diets, allergies: data.allergies },
            config,
        );
        const { username, id, diets, allergies, token, fav_recipes_id } = response.data;
        const user = { username, id, diets, allergies, fav_recipes_id };
        setStorageToken(token, payload.remember);
        return user;
    },
    logout: async () => {
        clearStorageToken();
    },
    reconnectSession: async (payload: { token: string }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            token: payload.token,
        };
        const response = await axios.post('http://localhost:5000/auth/reconnect', data, config);
        const { username, id, diets, allergies, fav_recipes_id } = response.data;
        const user = { username, id, diets, allergies, fav_recipes_id };
        return user;
    },
    updateUserInfo: async (payload: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            id: payload,
        };
        const response = await axios.post('http://localhost:5000/auth/updateuser', data, config);
        const { username, id, diets, allergies, fav_recipes_id } = response.data;
        const user = { username, id, diets, allergies, fav_recipes_id };
        return user;
    },
};
