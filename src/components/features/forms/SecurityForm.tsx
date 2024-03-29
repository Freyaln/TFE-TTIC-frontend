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
        <form onSubmit={handleSubmit(onSubmit)} className="account--main--form--password">
            <div>
                <label>Old password</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="account--main--form--password--input"
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
                            className="account--main--form--password--input"
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
                            className="account--main--form--password--input"
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
            <Input type="submit" className="account--main--form--button" />
            <Box className={isChanged ? 'settings--changed--visible' : 'settings--changed--invisible'}>
                <Typography variant={'h6'} className="settings--changed--visible--applied">
                    Password changed !
                </Typography>
            </Box>
        </form>
    );
};

export default SecurityForm;
