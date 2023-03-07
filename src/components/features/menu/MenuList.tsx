import { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { clearStorageToken } from '../../utils/Storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import { Link } from 'react-router-dom';

const MenuList: FC = ({}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const handleDisconnect = () => {
        clearStorageToken();
    };

    return (
        <Box>
            <List>
                <ListItem>
                    <Link style={{ display: 'flex', alignItems: 'center' }} to={`/account-settings/${user?.username}`}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link style={{ display: 'flex', alignItems: 'center' }} to="/saved-recipes">
                        <ListItemIcon>
                            <GradeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Saved recipes" />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link style={{ display: 'flex', alignItems: 'center' }} to="/login">
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" onClick={handleDisconnect} />
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
};

export default MenuList;
