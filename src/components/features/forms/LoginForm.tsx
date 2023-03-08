import { FC, useEffect } from 'react';
import { Box, Button, Checkbox, Input, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../actions/auth.action';
import { RootState } from '../../utils/store';
import { registerAction } from '../../actions/register.action';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface ILoginCreds {
    email: string;
    password: string;
    remember: boolean;
}

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginSchema = yup.object({
        email: yup.string().email('Must be a valid email format').required('Please enter a valid email'),
        password: yup.string().min(5, 'Password must be between 5 & 16 characters').max(16).required(),
        remember: yup.boolean(),
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginCreds>({
        reValidateMode: 'onChange',
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });
    const { credentialForm, dietsForm, allergiesForm } = useSelector((state: RootState) => state.register.forms);
    const onSubmit: SubmitHandler<ILoginCreds> = (data) => {
        const { email, password, remember } = data;
        dispatch(authActions({ email, password, remember }) as any);
        navigate('/');
    };

    useEffect(() => {
        credentialForm && dietsForm && allergiesForm
            ? dispatch(registerAction({ credentialForm, dietsForm, allergiesForm }) as any)
            : null;
    }, []);

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
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Email..."
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
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
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Password..."
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                        name="password"
                        control={control}
                    />
                </div>
                <div>
                    <Controller
                        render={({ field }) => (
                            <Checkbox {...field} sx={{ marginRight: '0.5rem', padding: 0 }} value={false} />
                        )}
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
