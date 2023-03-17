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
        <Box className="header--box">
            <header className="header--container">
                <div className="header--title--container">
                    <Typography variant="h1" fontSize="2rem" className="header--title--font">
                        [APPNAME]
                    </Typography>
                </div>
                <div className="header--burger">
                    <Sidebar />
                </div>
            </header>
            <section className="header--nav--container">
                <List className="header--nav--list">
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
                    <ListItem className="header--nav--list--item--nowrap">
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
                <Searchbar inputClass="searchbar--input" onChange={(e) => handleSearchInput(e.currentTarget.value)} />
            </section>
        </Box>
    );
};

export default Header;
