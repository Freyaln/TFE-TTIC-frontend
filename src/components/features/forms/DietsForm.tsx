import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Checkbox, Input, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerDietsForm } from '../../slices/registerSlices';
import { RootState } from '../../utils/store';
import changeDiets from '../../services/changeDiets.api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

export interface IDietsFormInput {
    gluten_free: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescetarian: boolean;
    paleo: boolean;
}
const DietsForm: FC<{ setTarget?: Dispatch<SetStateAction<string>> }> = ({ setTarget }) => {
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const location = useLocation();
    const signupPage = location.pathname === '/account-creation';
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const changeDietsSchema = yup.object({
        gluten_free: yup.boolean(),
        vegetarian: yup.boolean(),
        vegan: yup.boolean(),
        pescetarian: yup.boolean(),
        paleo: yup.boolean(),
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            reValidateMode: 'onChange',
            resolver: yupResolver(changeDietsSchema),
            gluten_free: !!user?.diets?.gluten_free,
            vegetarian: !!user?.diets?.vegetarian,
            vegan: !!user?.diets?.vegan,
            pescetarian: !!user?.diets?.pescetarian,
            paleo: !!user?.diets?.paleo,
        },
    });

    const onSubmit: SubmitHandler<IDietsFormInput> = (data) => {
        if (signupPage) {
            dispatch(registerDietsForm(data));
            setTarget!('allergies');
        }
        if (data && !signupPage) {
            changeDiets(user!.id, data).then((res) => {
                if (res === 200) {
                    setIsChanged(true);
                    reset();
                }
            });
        } else {
            console.log("Diets aren't so good after all eh");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={
                signupPage
                    ? {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'stretch',
                      }
                    : {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          gap: '1rem',
                          marginLeft: '10%',
                      }
            }
        >
            <div>
                <Controller
                    render={({ field }) => <Checkbox {...field} checked={field.value} onChange={field.onChange} />}
                    name="gluten_free"
                    control={control}
                />
                <label>Gluten free</label>
            </div>
            <div>
                <Controller
                    render={({ field }) => <Checkbox {...field} checked={field.value} onChange={field.onChange} />}
                    name="vegetarian"
                    control={control}
                />
                <label>Vegetarian</label>
            </div>
            <div>
                <Controller
                    render={({ field }) => <Checkbox {...field} checked={field.value} onChange={field.onChange} />}
                    name="vegan"
                    control={control}
                />
                <label>Vegan</label>
            </div>
            <div>
                <Controller
                    render={({ field }) => <Checkbox {...field} checked={field.value} onChange={field.onChange} />}
                    name="pescetarian"
                    control={control}
                />
                <label>Pescetarian</label>
            </div>
            <div>
                <Controller
                    render={({ field }) => <Checkbox {...field} checked={field.value} onChange={field.onChange} />}
                    name="paleo"
                    control={control}
                />
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
                    Diets changed !
                </Typography>
            </Box>
        </form>
    );
};

export default DietsForm;
