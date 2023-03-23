import { FC, forwardRef, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Irecipes } from '../../interfaces/recipesInterfaces';
import Wines from '../features/Wines';
import Instructions from '../features/Instructions';

const possiblePersons = [
    {
        number: 1,
        value: 'One',
    },
    {
        number: 2,
        value: 'Two',
    },
    {
        number: 3,
        value: 'Three',
    },
    {
        number: 4,
        value: 'Four',
    },
    {
        number: 5,
        value: 'Five',
    },
    {
        number: 6,
        value: 'Six',
    },
];

const Recipe: FC = ({}) => {
    const [persons, setPersons] = useState('1');
    const [columns, setColumns] = useState<number>(1);
    const [moreWines, setMoreWines] = useState<boolean>(false);
    const datas: Irecipes = useLoaderData() as Irecipes;

    const handleChangePersons = (event: SelectChangeEvent) => {
        setPersons(event.target.value);
    };

    useEffect(() => {
        if (datas.extendedIngredients.length > 5) {
            setColumns(2);
        } else {
            setColumns(1);
        }
        if (datas.winePairing.productMatches !== undefined && datas.winePairing.productMatches.length > 0) {
            setMoreWines(true);
        }
    }, [datas]);

    return (
        <Box>
            <Typography variant="h2" fontSize="1.5rem" className="recipe--title">
                {datas.title}
            </Typography>
            <Typography variant="h5" fontSize="1.25rem" className="recipe--subtitle">
                Cooking time : {datas.readyInMinutes} min
            </Typography>
            <Box component="img" className="recipe--image--container" alt={datas.title} src={datas.image} />
            <Box className="recipe--details--persons__count--container">
                <FormControl>
                    <InputLabel id="numberPersons" className="recipe--details--persons__count">
                        How many persons ?
                    </InputLabel>
                    <Select
                        labelId="numberPersons"
                        value={persons}
                        label="How many persons ?"
                        onChange={handleChangePersons}
                        className="recipe--details--persons__count"
                    >
                        {possiblePersons.map((i) => (
                            <MenuItem key={uuidv4()} value={i.number}>
                                {i.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Typography variant="h6" className="recipe--details--subtitle">
                Ingredients
            </Typography>
            <Box className="recipe--details--list">
                <List>
                    {columns === 2 ? (
                        <Grid container direction="row">
                            {datas.extendedIngredients.map((i) => (
                                <Grid item xs={6} key={uuidv4()}>
                                    <ListItem key={uuidv4()}>
                                        <Box
                                            component="img"
                                            className="recipe--details--list__item--image"
                                            alt={i.name}
                                            src={`https://spoonacular.com/cdn/ingredients_100x100/${i.image}`}
                                        ></Box>
                                        <ListItemText
                                            className="recipe--details--list__item--text--xs"
                                            primary={i.name.replace(/^\w/, (c) => c.toUpperCase())}
                                            secondary={`${i.measures.metric.amount * Number(persons)}  ${
                                                i.measures.metric.unitLong
                                            }`}
                                        ></ListItemText>
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        datas.extendedIngredients.map((i) => (
                            <ListItem key={uuidv4()}>
                                <Box
                                    component="img"
                                    className="recipe--details--list__item--image"
                                    alt={i.name}
                                    src={`https://spoonacular.com/cdn/ingredients_100x100/${i.image}`}
                                ></Box>
                                <ListItemText primary={i.name.replace(/^\w/, (c) => c.toUpperCase())}></ListItemText>
                            </ListItem>
                        ))
                    )}
                </List>
                {datas && <Instructions instructions={datas.analyzedInstructions} />}
            </Box>
            {moreWines && <Wines wines={datas.winePairing} />}
        </Box>
    );
};

export default Recipe;
