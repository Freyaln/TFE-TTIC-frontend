import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Box, Input } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCreationForm } from '../../slices/registerSlices';

export interface ICreationFormInput {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}
const CreationForm: FC<{ setTarget: Dispatch<SetStateAction<string>> }> = ({ setTarget }) => {
    const [formIsValid, setFormIsValid] = useState<boolean | null>(null);
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
        },
    });
    const onSubmit: SubmitHandler<ICreationFormInput> = (data) => {
        if (data.password === data.confirmPassword) {
            dispatch(updateCreationForm(data));
            setFormIsValid(true);
            setTarget('diets');
        } else {
            setFormIsValid(false);
        }
    };
    return (
        <Box>
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>Email</label>
                    <Controller
                        render={({ field }) => <Input {...field} sx={{ width: '100%' }} placeholder="Email..." />}
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
                    <label>Username</label>
                    <Controller
                        render={({ field }) => <Input {...field} sx={{ width: '100%' }} placeholder="Username" />}
                        name="username"
                        control={control}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>Password</label>
                    <Controller
                        render={({ field }) => (
                            <Input {...field} sx={{ width: '100%' }} placeholder="Password..." type="password" />
                        )}
                        name="password"
                        control={control}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label style={formIsValid != false ? {} : { color: 'red' }}>Confirm password</label>
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                sx={{ width: '100%' }}
                                placeholder="Confirm password..."
                                type="password"
                            />
                        )}
                        name="confirmPassword"
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
            </form>
        </Box>
    );
};

export default CreationForm;
