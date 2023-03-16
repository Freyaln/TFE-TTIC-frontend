import { FC, useEffect, useState } from 'react';
import '../../index.css';
import { Box, Typography } from '@mui/material';
import Sidebar from './menu/Sidebar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchingSearchedQuery } from '../actions/fetching.action';

const Header: FC = ({}) => {
    const [query, setQuery] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleSearchInput = (query: string) => {
        setQuery(query);
    };

    useEffect(() => {
        query != null ? dispatch(fetchingSearchedQuery(query) as any) : '';
    }, [query]);

    return (
        <Box sx={{ height: '7.5%' }}>
            <header className="container-flex-row-fend-fixed">
                <div className="container-w80-center">
                    <Typography variant="h1" fontSize="2rem" className="title-pf-bolder">
                        [APPNAME]
                    </Typography>
                </div>
                <div style={{ width: '10%' }}>
                    <Sidebar />
                </div>
            </header>
            <section className="container-flex-row-sbetween-h60">
                <List className="container-flex-row-fend">
                    <ListItem>
                        <Link to="/">
                            <ListItemText
                                primary="Recipes"
                                primaryTypographyProps={{
                                    fontSize: '0.85rem',
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Link>
                    </ListItem>
                    <ListItem sx={{ whiteSpace: 'nowrap' }}>
                        <Link to="/wines-guide">
                            <ListItemText
                                primary="Wines guides"
                                primaryTypographyProps={{
                                    fontSize: '0.85rem',
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Link>
                    </ListItem>
                </List>
                <Searchbar inputClass="searchBar" onChange={(e) => handleSearchInput(e.currentTarget.value)} />
            </section>
        </Box>
    );
};

export default Header;
