import { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Input, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { authActions } from '../../actions/auth.action';
import checkPwd from '../../services/checkPwd.api';
import changePwd from '../../services/changePwd.api';

interface IPasswordFormInput {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const SecurityForm: FC = ({}) => {
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const changePasswordSchema = yup.object({
        oldPassword: yup.string().required('Please enter a valid password'),
        newPassword: yup.string().min(5, 'Password must be between 5 & 16 characters').max(16).required(),
        confirmNewPassword: yup.string().min(5, 'Password must be between 5 & 16 characters').max(16).required(),
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        reValidateMode: 'onChange',
        resolver: yupResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit: SubmitHandler<IPasswordFormInput> = async (data) => {
        const { oldPassword, newPassword, confirmNewPassword } = data;
        await checkPwd(user!.id, oldPassword).then((res) => {
            if (res === 200) {
                console.log(res);
                if (newPassword === confirmNewPassword) {
                    changePwd(user!.id, newPassword).then((res) => {
                        if (res === 200) {
                            setIsChanged(true);
                            reset();
                        }
                    });
                }
            } else {
                console.log('Password missmatch');
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '1rem',
                marginLeft: '10%',
            }}
        >
            <div>
                <label>Old password</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '75%' }}
                            placeholder="Old password..."
                            type="password"
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword?.message}
                        />
                    )}
                    name="oldPassword"
                    control={control}
                />
            </div>
            <div>
                <label>New password</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '75%' }}
                            placeholder="New password..."
                            type="password"
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message}
                        />
                    )}
                    name="newPassword"
                    control={control}
                />
            </div>
            <div>
                <label>Confirm password</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '75%' }}
                            placeholder="Confirm password..."
                            type="password"
                            error={!!errors.confirmNewPassword}
                            helperText={errors.confirmNewPassword?.message}
                        />
                    )}
                    name="confirmNewPassword"
                    control={control}
                />
            </div>
            <Input
                type="submit"
                sx={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 'bold',
                    padding: '0.25rem 0.75rem 0.25rem 0.75rem',
                    backgroundColor: '#906942',
                    borderRadius: '5px',
                    border: 'none',
                    color: '#FFF',
                    '::before': { border: 'none' },
                }}
            />
            <Box sx={isChanged ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <Typography
                    variant={'h6'}
                    sx={{
                        color: 'green',
                        fontFamily: 'Playfair Display',
                        fontWeight: 'bolder',
                        textAlign: 'center',
                    }}
                >
                    Password changed !
                </Typography>
            </Box>
        </form>
    );
};

export default SecurityForm;
