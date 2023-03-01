import { FC } from 'react';
import { Box, Button, Checkbox, Input, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import { setStorageToken } from '../../utils/Storage';

interface ILoginCreds {
    email: string;
    password: string;
    remember: boolean;
}

const LoginForm: FC = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ILoginCreds> = (data) => {
        axios
            .post('http://localhost:5000/auth/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.token;
                    setStorageToken(token, data.remember);
                    navigate('/');
                } else {
                    console.log(response.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Box sx={{ position: 'absolute', top: '10%' }}>
                <Typography variant="h1" fontSize="2rem" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bolder' }}>
                    [APPNAME]
                </Typography>
            </Box>
            <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '1rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label style={{ fontWeight: 'bold' }}>Email</label>
                    <Controller
                        render={({ field }) => <Input {...field} placeholder="Email..." />}
                        name="email"
                        control={control}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label style={{ fontWeight: 'bold' }}>Password</label>
                    <Controller
                        render={({ field }) => <Input {...field} placeholder="Password..." />}
                        name="password"
                        control={control}
                    />
                </div>
                <div>
                    <Controller
                        render={({ field }) => <Checkbox {...field} sx={{ marginRight: '0.5rem', padding: 0 }} />}
                        name="remember"
                        control={control}
                    />
                    <label style={{ fontSize: '0.85rem' }}>Remember me</label>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="subtitle2" fontSize="0.60rem" sx={{ fontFamily: 'Playfair Display' }}>
                        Forgot your password ?
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth={true}
                        sx={{
                            backgroundColor: '#906942',
                            color: '#FFF',
                            fontFamily: 'Playfair Display',
                        }}
                    >
                        Login
                    </Button>
                </div>
            </form>
            <Box sx={{ position: 'absolute', bottom: '15%' }}>
                <Typography variant="subtitle2" sx={{ fontFamily: 'Playfair Display' }}>
                    Don`&apos;t have an account yet ?
                </Typography>
                <Button
                    href="/account-creation"
                    sx={{
                        backgroundColor: '#906942',
                        color: '#FFF',
                        width: '7.5rem',
                        fontFamily: 'Playfair Display',
                    }}
                >
                    Create it
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;
