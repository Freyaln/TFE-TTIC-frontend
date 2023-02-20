import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Searchbar from './Searchbar';

const Header: FC = ({}) => {
    const [searchDatas, setSearchDatas] = useState<string>('');
    const handleSearchInput = (value: string) => {
        value ? setSearchDatas(value) : setSearchDatas('');
    };

    return (
        <Box sx={{ height: '7.5%' }}>
            <header
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    backgroundColor: '#EBDDCD',
                    zIndex: 1000,
                }}
            >
                <div style={{ width: '80%', textAlign: 'center' }}>
                    <Typography
                        variant="h1"
                        fontSize="2rem"
                        sx={{ fontFamily: 'Playfair Display', fontWeight: 'bolder' }}
                    >
                        [APPNAME]
                    </Typography>
                </div>
                <div style={{ width: '10%' }}>
                    <Sidebar />
                </div>
            </header>
            <section
                style={{
                    backgroundColor: 'rgba(152,118,84,0.5)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 60,
                    width: '100%',
                    marginTop: 60,
                }}
            >
                <List sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <ListItem>
                        <ListItemButton component="a" href="/">
                            <ListItemText
                                primary="Recipes"
                                primaryTypographyProps={{
                                    fontSize: '0.85rem',
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 'bold',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ whiteSpace: 'nowrap' }}>
                        <ListItemButton component="a" href="/wines-guide">
                            <ListItemText
                                primary="Wines guides"
                                primaryTypographyProps={{
                                    fontSize: '0.85rem',
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 'bold',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Searchbar inputClass="searchBar" onChange={(e) => handleSearchInput(e.currentTarget.value)} />
            </section>
        </Box>
    );
};

export default Header;
