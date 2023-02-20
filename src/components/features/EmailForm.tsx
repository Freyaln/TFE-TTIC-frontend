import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@mui/material';

interface IEmailFormInput {
    oldEmail: string;
    newEmail: string;
    confirmNewEmail: string;
}

const EmailForm: FC = ({}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            oldEmail: '',
            newEmail: '',
            confirmNewEmail: '',
        },
    });

    const onSubmit: SubmitHandler<IEmailFormInput> = (data) => {
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
                <label>Old email</label>
                <Controller
                    render={({ field }) => <Input {...field} sx={{ width: '75%' }} placeholder="Old email..." />}
                    name="oldEmail"
                    control={control}
                />
            </div>
            <div>
                <label>New email</label>
                <Controller
                    render={({ field }) => <Input {...field} sx={{ width: '75%' }} placeholder="New email..." />}
                    name="newEmail"
                    control={control}
                />
            </div>
            <div>
                <label>Confirm email</label>
                <Controller
                    render={({ field }) => <Input {...field} sx={{ width: '75%' }} placeholder="Confirm email..." />}
                    name="confirmNewEmail"
                    control={control}
                />
            </div>
            <Input type="submit" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }} />
        </form>
    );
};

export default EmailForm;
