import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import '../../../index.css';
import { Box, Input } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerCredentialForm } from '../../slices/registerSlices';

export interface ICreationFormInput {
    email: string;
    password: string;
    confirmPassword?: string;
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
            setFormIsValid(true);
            const { email, password, username } = data;
            dispatch(registerCredentialForm({ email: email, password: password, username: username }));
            setTarget('diets');
        } else {
            setFormIsValid(false);
        }
    };
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} className="signup--main--form--creation">
                <div className="signup--main--form--input--container">
                    <label>Email</label>
                    <Controller
                        render={({ field }) => (
                            <Input {...field} className="signup--main--form--input" placeholder="Email..." />
                        )}
                        name="email"
                        control={control}
                    />
                </div>
                <div className="signup--main--form--input--container">
                    <label>Username</label>
                    <Controller
                        render={({ field }) => (
                            <Input {...field} className="signup--main--form--input" placeholder="Username" />
                        )}
                        name="username"
                        control={control}
                    />
                </div>
                <div className="signup--main--form--input--container">
                    <label>Password</label>
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                className="signup--main--form--input"
                                placeholder="Password..."
                                type="password"
                            />
                        )}
                        name="password"
                        control={control}
                    />
                </div>
                <div className="signup--main--form--input--container">
                    <label style={formIsValid != false ? {} : { color: 'red' }}>Confirm password</label>
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                className="signup--main--form--input"
                                placeholder="Confirm password..."
                                type="password"
                            />
                        )}
                        name="confirmPassword"
                        control={control}
                    />
                </div>
                <Input type="submit" className="signup--main--form--button" />
            </form>
        </Box>
    );
};

export default CreationForm;
