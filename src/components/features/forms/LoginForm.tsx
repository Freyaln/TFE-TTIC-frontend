import { FC, useEffect } from 'react';
import '../../../index.css';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
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
    const onSubmit: SubmitHandler<ILoginCreds> = (credentials) => {
        const { email, password, remember } = credentials;
        dispatch(authActions({ email, password, remember }) as any);
        navigate('/');
    };

    useEffect(() => {
        credentialForm && dietsForm && allergiesForm
            ? dispatch(registerAction({ credentialForm, dietsForm, allergiesForm }) as any)
            : null;
    }, []);

    return (
        <Box className="login--container">
            <Box className="login--title">
                <Typography variant="h1" fontSize="2rem" className="login--title--font">
                    [APPNAME]
                </Typography>
            </Box>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="login--form--container">
                <div className="login--form--input--container">
                    <label className="login--form--label">Email</label>
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
                <div className="login--form--input--container">
                    <label className="login--form--label">Password</label>
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
                        render={({ field }) => <Checkbox {...field} className="checkboxes-mr-p" value={false} />}
                        name="remember"
                        control={control}
                    />
                    <label className="login--form-check--label">Remember me</label>
                </div>
                <div className="login--form--input--container">
                    <Typography variant="subtitle2" fontSize="0.60rem" className="login--form--forget--font">
                        Forgot your password ?
                    </Typography>
                    <Button type="submit" fullWidth={true} className="login--form--submit">
                        Login
                    </Button>
                </div>
            </form>
            <Box className="login--create--container">
                <Typography variant="subtitle2" className="login--create--font">
                    Don`&apos;t have an account yet ?
                </Typography>
                <Button href="/account-creation" className="login--create--button">
                    Create it
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;
