import React, { FC, ReactComponentElement, useEffect, useState } from 'react';
import '../../index.css';
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
        <Box className="signup--container">
            <header className="signup--header">
                <Typography variant="h1" fontSize="2rem" className="signup--header--title">
                    Create your [APPNAME] account
                </Typography>
            </header>
            <main className="signup--main--container">{sectionDisplayed}</main>
        </Box>
    );
};

export default Signup;
