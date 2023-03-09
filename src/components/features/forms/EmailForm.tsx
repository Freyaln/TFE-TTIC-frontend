import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Input, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import changeEmail from '../../services/changeEmail.api';

interface IEmailFormInput {
    oldEmail: string;
    newEmail: string;
    confirmNewEmail: string;
}

const EmailForm: FC = ({}) => {
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const changeEmailSchema = yup.object({
        oldEmail: yup.string().email().required('Please enter a valid email'),
        newEmail: yup.string().email().required('Please enter a valid email'),
        confirmNewEmail: yup.string().email().required('Please enter a valid email'),
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            oldEmail: '',
            newEmail: '',
            confirmNewEmail: '',
        },
    });

    const onSubmit: SubmitHandler<IEmailFormInput> = async (data) => {
        const { oldEmail, newEmail, confirmNewEmail } = data;
        if (newEmail === confirmNewEmail) {
            changeEmail(user!.id, newEmail).then((res) => {
                if (res === 200) {
                    setIsChanged(true);
                    reset();
                }
            });
        } else {
            console.log("User with this email doesn't exist");
        }
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
                <label>Old email</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '75%' }}
                            placeholder="Old email..."
                            error={!!errors.oldEmail}
                            helperText={errors.oldEmail?.message}
                        />
                    )}
                    name="oldEmail"
                    control={control}
                />
            </div>
            <div>
                <label>New email</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '75%' }}
                            placeholder="New email..."
                            error={!!errors.newEmail}
                            helperText={errors.newEmail?.message}
                        />
                    )}
                    name="newEmail"
                    control={control}
                />
            </div>
            <div>
                <label>Confirm email</label>
                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '75%' }}
                            placeholder="Confirm email..."
                            error={!!errors.confirmNewEmail}
                            helperText={errors.confirmNewEmail?.message}
                        />
                    )}
                    name="confirmNewEmail"
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
                    Email changed !
                </Typography>
            </Box>
        </form>
    );
};

export default EmailForm;
