import { FC } from 'react';
import '../../../index.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox, Input } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerAllergiesForm } from '../../slices/registerSlices';
import { updateAllergiesAction } from '../../actions/update.action';
import { RootState } from '../../utils/store';

export interface IAllergiesFormInput {
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
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
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
        location.pathname === '/account-creation'
            ? dispatch(registerAllergiesForm(data))
            : dispatch(updateAllergiesAction({ user: user!.id, allergies: data }) as any);
        navigate('/login');
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={
                location.pathname === '/account-creation'
                    ? 'signup--main--form--allergies--space'
                    : 'signup--main--form--allergies--center'
            }
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
            <Input type="submit" className="signup--main--form--button" />
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
