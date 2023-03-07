import { FC, ReactComponentElement, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SecurityForm from '../features/forms/SecurityForm';
import EmailForm from '../features/forms/EmailForm';
import DietsForm from '../features/forms/DietsForm';
import AllergiesForm from '../features/forms/AllergiesForm';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';

interface IUnderline {
    target: string;
}

const Account: FC = ({}) => {
    const [settingDisplayed, setSettingDisplayed] = useState<ReactComponentElement<FC>>(<SecurityForm />);
    const [underline, setUnderline] = useState<IUnderline>({ target: 'security' });

    const user = useSelector((state: RootState) => state.auth.user);
    function handleSection(target: string) {
        switch (target) {
            case 'security':
                setSettingDisplayed(() => <SecurityForm />);
                setUnderline({
                    target: target,
                });
                break;
            case 'email':
                setSettingDisplayed(() => <EmailForm />);
                setUnderline({
                    target: target,
                });
                break;
            case 'diets':
                setSettingDisplayed(() => <DietsForm />);
                setUnderline({
                    target: target,
                });
                break;
            case 'allergies':
                setSettingDisplayed(() => <AllergiesForm />);
                setUnderline({
                    target: target,
                });
                break;
            default:
                setSettingDisplayed(() => <SecurityForm />);
                setUnderline({
                    target: 'security',
                });
        }
    }

    return (
        <Box sx={{ height: '100%' }}>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25%' }}>
                <Typography
                    variant="h1"
                    fontSize="2rem"
                    sx={{ fontFamily: 'Playfair Display', textAlign: 'center', maxWidth: '60%' }}
                >
                    {user?.username} account settings
                </Typography>
            </header>
            <main style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '50%' }}>
                <div>
                    <List>
                        <ListItem
                            sx={{
                                textDecoration: underline.target === 'security' ? 'underline' : 'none',
                                textUnderlineOffset: '0.5rem',
                            }}
                        >
                            <ListItemButton component="a" href="#security" onClick={() => handleSection('security')}>
                                <ListItemText
                                    primary="Security"
                                    id="security"
                                    primaryTypographyProps={{ sx: { fontFamily: 'Playfair Display' } }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                textDecoration: underline.target === 'email' ? 'underline' : 'none',
                                textUnderlineOffset: '0.5rem',
                            }}
                        >
                            <ListItemButton component="a" href="#email" onClick={() => handleSection('email')}>
                                <ListItemText
                                    primary="Email"
                                    id="email"
                                    primaryTypographyProps={{ sx: { fontFamily: 'Playfair Display' } }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                textDecoration: underline.target === 'diets' ? 'underline' : 'none',
                                textUnderlineOffset: '0.5rem',
                            }}
                        >
                            <ListItemButton component="a" href="#diets" onClick={() => handleSection('diets')}>
                                <ListItemText
                                    primary="Diets"
                                    id="diets"
                                    primaryTypographyProps={{ sx: { fontFamily: 'Playfair Display' } }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                textDecoration: underline.target === 'allergies' ? 'underline' : 'none',
                                textUnderlineOffset: '0.5rem',
                            }}
                        >
                            <ListItemButton component="a" href="#allergies" onClick={() => handleSection('allergies')}>
                                <ListItemText
                                    primary="Int./Allergies"
                                    id="allergies"
                                    primaryTypographyProps={{ sx: { fontFamily: 'Playfair Display' } }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton component="a" href="/">
                                <ListItemText
                                    primary="Back"
                                    primaryTypographyProps={{ sx: { fontFamily: 'Playfair Display' } }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
                <Divider orientation="vertical" flexItem={true} />
                {settingDisplayed}
            </main>
        </Box>
    );
};

export default Account;
