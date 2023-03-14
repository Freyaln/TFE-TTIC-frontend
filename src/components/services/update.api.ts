import axios from 'axios';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';

export interface IupdatePayload {
    user: string;
    diets?: IDietsFormInput;
    allergies?: IAllergiesFormInput;
}

export const updateApi = {
    updateDiets: async (payload: IupdatePayload) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            id: payload.user,
            diets: payload.diets,
        };
        const response = await axios.post(
            'http://localhost:5000/auth/changediets',
            { id: data.id, diets: data.diets },
            config,
        );
        return response.status;
    },
    updateAllergies: async (payload: IupdatePayload) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            id: payload.user,
            allergies: payload.allergies,
        };
        const response = await axios.post(
            'http://localhost:5000/auth/changeallergies',
            {
                id: data.id,
                allergies: data.allergies,
            },
            config,
        );
        return response;
    },
};
