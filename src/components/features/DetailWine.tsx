import { FC, useEffect, useState } from 'react';
import '../../index.css';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import { winesApi } from '../services/wines.api';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { dishesPairing } from '../../interfaces/recipesInterfaces';

export interface IDialogProps {
    open: boolean;
    name: string;
    onClose: () => void;
}
const DetailWine: FC<IDialogProps> = ({ open, name, onClose }) => {
    const KEY = process.env.REACT_APP_API_KEY;
    const URL = process.env.REACT_APP_API_URL;
    const [wineData, setWineData] = useState<dishesPairing>();

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        winesApi.fetchDishes(name).then((res) => setWineData(res));
    }, [open]);

    console.log(wineData);

    if (wineData) {
        return (
            <Dialog open={open} onClose={handleClose} className="dialog--container">
                <DialogTitle className="dialog--title">{name.toUpperCase()}</DialogTitle>
                {wineData.pairings.length && wineData.pairings.length > 1 ? (
                    wineData.pairings.map((i) => (
                        <List key={uuidv4()}>
                            <ListItemText primary={i} />
                        </List>
                    ))
                ) : (
                    <Typography>{wineData.pairings}</Typography>
                )}

                <Typography>{wineData.text}</Typography>
            </Dialog>
        );
    } else {
        return <h2>I am sorry, there is no informations a this moment about this wine.</h2>;
    }
};

export default DetailWine;
