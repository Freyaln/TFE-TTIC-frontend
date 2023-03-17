import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import '../../../index.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Checkbox, Input, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerDietsForm } from '../../slices/registerSlices';
import { RootState } from '../../utils/store';
import changeDiets from '../../services/changeDiets.api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateDietsAction } from '../../actions/update.action';

export interface IDietsFormInput {
    gluten_free: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescetarian: boolean;
    paleo: boolean;
}
const DietsForm: FC<{ setTarget?: Dispatch<SetStateAction<string>> }> = ({ setTarget }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [formDefaultValue, setFormDefaultValue] = useState({
        gluten_free: !!user?.diets?.gluten_free,
        vegetarian: !!user?.diets?.vegetarian,
        vegan: !!user?.diets?.vegan,
        pescetarian: !!user?.diets?.pescetarian,
        paleo: !!user?.diets?.paleo,
    });
    const location = useLocation();
    const signupPage = location.pathname === '/account-creation';
    const dispatch = useDispatch();

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
            gluten_free: formDefaultValue.gluten_free,
            vegetarian: formDefaultValue.vegetarian,
            vegan: formDefaultValue.vegan,
            pescetarian: formDefaultValue.pescetarian,
            paleo: formDefaultValue.paleo,
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
                    const { gluten_free, vegetarian, vegan, pescetarian, paleo } = data;
                    dispatch(
                        updateDietsAction({
                            user: user!.id,
                            diets: {
                                gluten_free: gluten_free,
                                vegetarian: vegetarian,
                                vegan: vegan,
                                pescetarian: pescetarian,
                                paleo: paleo,
                            },
                        }) as any,
                    );
                    setFormDefaultValue({
                        ...formDefaultValue,
                        gluten_free: gluten_free,
                        vegetarian: vegetarian,
                        vegan: vegan,
                        pescetarian: pescetarian,
                        paleo: paleo,
                    });
                    setIsChanged(true);
                }
            });
        } else {
            console.log("Diets aren't so good after all eh");
        }
    };

    useEffect(() => {
        reset({ ...formDefaultValue });
    }, [user, formDefaultValue]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={signupPage ? 'signup--main--form--diets--stretch' : 'signup--main--form--diets--start'}
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
            <Input type="submit" className="signup--main--form--button" />
            <Box className={isChanged ? 'settings--changed--visible' : 'settings--changed--invisible'}>
                <Typography variant={'h6'} className="settings--changed--visible--applied">
                    Diets changed !
                </Typography>
            </Box>
        </form>
    );
};

export default DietsForm;
