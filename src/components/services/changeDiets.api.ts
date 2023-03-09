import axios from 'axios';
import { IDietsFormInput } from '../features/forms/DietsForm';

export interface IChangeDiets {
    id: string;
    newPassword: string;
}

const changeDiets = async (id: string, diets: IDietsFormInput) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const data = {
        id: id,
        diets: diets,
    };
    const response = await axios.post(
        'http://localhost:5000/auth/changediets',
        { id: data.id, diets: data.diets },
        config,
    );
    return response.status;
};

export default changeDiets;
