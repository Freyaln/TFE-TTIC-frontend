import { FC, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Irecipes } from '../../interfaces/recipesInterfaces';

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
    const datas: Irecipes = useLoaderData() as Irecipes;
    const handleChangePersons = (event: SelectChangeEvent) => {
        setPersons(event.target.value);
    };

    return (
        <Box>
            <Typography
                variant="h2"
                fontSize="2rem"
                sx={{ fontFamily: 'Playfair Display', fontWeight: 'bolder', textAlign: 'center', marginTop: '1rem' }}
            >
                {datas.title}
            </Typography>
            <Box
                component="img"
                sx={{ position: 'relative', margin: '1rem auto', width: '90%', height: 'auto' }}
                alt={datas.title}
                src={datas.image}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl>
                    <InputLabel id="numberPersons" sx={{ width: '10rem' }}>
                        How many persons ?
                    </InputLabel>
                    <Select
                        labelId="numberPersons"
                        value={persons}
                        label="How many persons ?"
                        onChange={handleChangePersons}
                        sx={{ width: '10rem', fontFamily: 'Playfair Display' }}
                    >
                        {possiblePersons.map((i) => (
                            <MenuItem key={uuidv4()} value={i.number}>
                                {i.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', marginLeft: '15%' }}>
                Ingredients
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <List>
                    {datas.extendedIngredients.map((i) => (
                        <ListItem key={uuidv4()}>
                            <Box
                                component="img"
                                sx={{ width: 24, height: 24, marginRight: '1rem' }}
                                alt={i.name}
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${i.image}`}
                            ></Box>
                            <ListItemText primary={i.name.replace(/^\w/, (c) => c.toUpperCase())}></ListItemText>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {datas.extendedIngredients.map((i) => (
                        <ListItem key={uuidv4()}>
                            <ListItemText
                                key={uuidv4()}
                                primary={`${i.amount * Number(persons)}  ${i.unit}`}
                            ></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', marginLeft: '15%' }}>
                Suggested wines
            </Typography>
            <Box sx={{ display: 'flex', marginLeft: '17%' }}>
                {/*<List>*/}
                {/*    {mockIngredients.map((i) => (*/}
                {/*        <ListItem key={uuidv4()}>*/}
                {/*            <ListItemText primary={i.nameWine} secondary={i.descWine}></ListItemText>*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
            </Box>
        </Box>
    );
};

export default Recipe;
