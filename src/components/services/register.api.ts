import axios from 'axios';
import { IDietsFormInput } from '../features/forms/DietsForm';
import { IAllergiesFormInput } from '../features/forms/AllergiesForm';
import { IRegisterCredentialsForm } from '../slices/registerSlices';
export interface IRegisterForms {
    creationForm: IRegisterCredentialsForm;
    dietsForm: IDietsFormInput;
    allergiesForm: IAllergiesFormInput;
}

export const registerApi = {
    register: async (payload: {
        credentialForm: IRegisterCredentialsForm | null;
        dietsForm: IDietsFormInput | null;
        allergiesForm: IAllergiesFormInput | null;
    }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = {
            credentials: payload.credentialForm,
            diets: payload.dietsForm,
            allergies: payload.allergiesForm,
        };
        const response = await axios.post(
            'http://localhost:5000/register/account-creation',
            {
                email: data.credentials!.email,
                password: data.credentials!.password,
                username: data.credentials!.username,
                diets: data.diets,
                allergies: data.allergies,
            },
            config,
        );
        console.log(response);
        return response;
    },
};
