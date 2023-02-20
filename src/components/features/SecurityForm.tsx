import { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '@mui/material';

interface IPasswordFormInput {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const SecurityForm: FC = ({}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit: SubmitHandler<IPasswordFormInput> = (data) => {
        console.log(data);
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
                    render={({ field }) => <Input {...field} sx={{ width: '75%' }} placeholder="Old password..." />}
                    name="oldPassword"
                    control={control}
                />
            </div>
            <div>
                <label>New password</label>
                <Controller
                    render={({ field }) => <Input {...field} sx={{ width: '75%' }} placeholder="New password..." />}
                    name="newPassword"
                    control={control}
                />
            </div>
            <div>
                <label>Confirm password</label>
                <Controller
                    render={({ field }) => <Input {...field} sx={{ width: '75%' }} placeholder="Confirm password..." />}
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
        </form>
    );
};

export default SecurityForm;
