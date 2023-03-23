import { useEffect, useState } from 'react';
import '../../index.css';
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { v4 as uuidv4 } from 'uuid';
import { winePairing } from '../../interfaces/recipesInterfaces';

interface IWinesDetails {
    wines: winePairing;
}

const Wines = ({ wines }: IWinesDetails) => {
    const [paired, setPaired] = useState<boolean>(false);

    useEffect(() => {
        wines.pairedWines != undefined && wines.pairedWines.length > 0 ? setPaired(true) : setPaired(false);
    }, [wines]);
    return (
        <Box>
            {wines &&
                wines.productMatches.map((i) => (
                    <div key={uuidv4()}>
                        <Typography variant="h6" className="recipe--details--subtitle">
                            Suggested wine
                        </Typography>
                        <Box key={uuidv4()}>
                            <List className="recipe--details--wine" key={uuidv4()}>
                                <ListItemText
                                    className="recipe--details--list__item--text--sm"
                                    primary={i.title}
                                    key={uuidv4()}
                                />
                                <Box
                                    component="img"
                                    className="recipe--details--list__item--image--wine"
                                    alt={i.title}
                                    src={`${i.imageUrl}`}
                                    key={uuidv4()}
                                ></Box>
                                <ListItem key={uuidv4()}>
                                    <ListItemText primary={i.description} key={uuidv4()}></ListItemText>
                                </ListItem>
                                {paired && (
                                    <>
                                        <Typography
                                            variant="h6"
                                            fontSize={'1rem'}
                                            className="recipe--details--subtitle"
                                            key={uuidv4()}
                                        >
                                            More suggestions ? Take a look
                                        </Typography>
                                        {wines.pairedWines.map((w) => (
                                            <List key={uuidv4()}>
                                                <ListItemText primary={w} key={uuidv4()} />
                                            </List>
                                        ))}
                                    </>
                                )}
                            </List>
                        </Box>
                    </div>
                ))}
        </Box>
    );
};

export default Wines;
