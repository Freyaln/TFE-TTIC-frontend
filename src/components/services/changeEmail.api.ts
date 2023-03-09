import axios from 'axios';

export interface IChangeEmail {
    id: string;
    newEmail: string;
}

const changeEmail = async (id: string, newEmail: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const data = {
        id: id,
        newEmail: newEmail,
    };
    const response = await axios.post(
        'http://localhost:5000/auth/changemail',
        { id: data.id, newEmail: data.newEmail },
        config,
    );
    return response.status;
};

export default changeEmail;
