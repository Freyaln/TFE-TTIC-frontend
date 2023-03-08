import axios from 'axios';

export interface ICheckPwd {
    id: string;
    oldPassword: string;
}

const checkPwd = async (id: string, oldPassword: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const data = {
        id: id,
        oldPassword: oldPassword,
    };
    const response = await axios.post(
        'http://localhost:5000/auth/checkpwd',
        { id: data.id, oldPassword: data.oldPassword },
        config,
    );
    return response.status;
};

export default checkPwd;
