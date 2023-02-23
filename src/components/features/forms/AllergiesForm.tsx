import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox, Input } from '@mui/material';

interface IAllergiesFormInput {
    dairy: boolean;
    egg: boolean;
    gluten: boolean;
    grain: boolean;
    peanut: boolean;
    seafood: boolean;
    sesame: boolean;
    shellfish: boolean;
    soy: boolean;
    sulfite: boolean;
    tree_nut: boolean;
    wheat: boolean;
}
const AllergiesForm: FC = ({}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            dairy: false,
            egg: false,
            gluten: false,
            grain: false,
            peanut: false,
            seafood: false,
            sesame: false,
            shellfish: false,
            soy: false,
            sulfite: false,
            tree_nut: false,
            wheat: false,
        },
    });

    const onSubmit: SubmitHandler<IAllergiesFormInput> = (data) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                maxHeight: '30rem',
                flexWrap: 'wrap',
            }}
        >
            <section>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="dairy" control={control} />
                    <label>Dairy</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="egg" control={control} />
                    <label>Egg</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="gluten" control={control} />
                    <label>Gluten</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="grain" control={control} />
                    <label>Grain</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="peanut" control={control} />
                    <label>Peanut</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="seafood" control={control} />
                    <label>Seafood</label>
                </div>
            </section>
            <Input
                type="submit"
                sx={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 'bold',
                    padding: '0.25rem 0.75rem 0.25rem 0.75rem',
                    marginLeft: '10%',
                    backgroundColor: '#906942',
                    borderRadius: '5px',
                    border: 'none',
                    color: '#FFF',
                    '::before': { border: 'none' },
                }}
            />
            <section>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="sesame" control={control} />
                    <label>Sesame</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="shellfish" control={control} />
                    <label>Shellfish</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="soy" control={control} />
                    <label>Soy</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="sulfite" control={control} />
                    <label>Sulfite</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="tree_nut" control={control} />
                    <label>Tree nut</label>
                </div>
                <div>
                    <Controller render={({ field }) => <Checkbox {...field} />} name="wheat" control={control} />
                    <label>Wheat</label>
                </div>
            </section>
        </form>
    );
};

export default AllergiesForm;
