import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox, Input } from '@mui/material';

interface IDietsFormInput {
    gluten_free: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescetarian: boolean;
    paleo: boolean;
}
const DietsForm: FC = ({}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            gluten_free: false,
            vegetarian: false,
            vegan: false,
            pescetarian: false,
            paleo: false,
        },
    });

    const onSubmit: SubmitHandler<IDietsFormInput> = (data) => {
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
                <Controller render={({ field }) => <Checkbox {...field} />} name="gluten_free" control={control} />
                <label>Gluten free</label>
            </div>
            <div>
                <Controller render={({ field }) => <Checkbox {...field} />} name="vegetarian" control={control} />
                <label>Vegetarian</label>
            </div>
            <div>
                <Controller render={({ field }) => <Checkbox {...field} />} name="vegan" control={control} />
                <label>Vegan</label>
            </div>
            <div>
                <Controller render={({ field }) => <Checkbox {...field} />} name="pescetarian" control={control} />
                <label>Pescetarian</label>
            </div>
            <div>
                <Controller render={({ field }) => <Checkbox {...field} />} name="paleo" control={control} />
                <label>Paleo</label>
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

export default DietsForm;
