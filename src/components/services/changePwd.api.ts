import axios from 'axios';

export interface IChangePwd {
    id: string;
    newPassword: string;
}

const changePwd = async (id: string, newPassword: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const data = {
        id: id,
        newPassword: newPassword,
    };
    const response = await axios.post(
        'http://localhost:5000/auth/changepwd',
        { id: data.id, newPassword: data.newPassword },
        config,
    );
    return response.status;
};

export default changePwd;
