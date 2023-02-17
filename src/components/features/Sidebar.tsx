import { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import MenuList from './MenuList';

const Sidebar: FC = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenSideMenu = (open: boolean) => {
        setIsOpen(open);
    };

    const handleCloseSideMenu = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <IconButton onClick={() => handleOpenSideMenu(true)} sx={{}}>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
                anchor="right"
                open={isOpen}
                sx={{ width: 1 }}
                PaperProps={{
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 1,
                    },
                }}
            >
                <MenuList />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
