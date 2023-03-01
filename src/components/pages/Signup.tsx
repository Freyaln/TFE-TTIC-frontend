import React, { FC, ReactComponentElement, useEffect, useState } from 'react';
import CreationForm from '../features/forms/CreationForm';
import DietsForm from '../features/forms/DietsForm';
import AllergiesForm from '../features/forms/AllergiesForm';
import { Box, Typography } from '@mui/material';

const Signup: FC = ({}) => {
    const [target, setTarget] = useState<string>('signup');
    const [sectionDisplayed, setSectionDisplayed] = useState<ReactComponentElement<FC>>(
        <CreationForm setTarget={setTarget} />,
    );
    useEffect(() => {
        switch (target) {
            case 'signup':
                setSectionDisplayed(() => <CreationForm setTarget={setTarget} />);
                break;
            case 'diets':
                setSectionDisplayed(() => <DietsForm setTarget={setTarget} />);
                break;
            case 'allergies':
                setSectionDisplayed(() => <AllergiesForm />);
                break;
            default:
                setSectionDisplayed(() => <CreationForm setTarget={setTarget} />);
        }
    }, [target]);

    return (
        <Box sx={{ height: '100%' }}>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
                <Typography
                    variant="h1"
                    fontSize="2rem"
                    sx={{ fontFamily: 'Playfair Display', fontWeight: 'bolder', textAlign: 'center' }}
                >
                    Create your [APPNAME] account
                </Typography>
            </header>
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '60%' }}>
                {sectionDisplayed}
            </main>
        </Box>
    );
};

export default Signup;
