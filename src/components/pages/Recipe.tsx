import { FC, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { IPhotosDefinition } from '../features/MainList';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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

const mockIngredients = [
    {
        idIng: 1,
        nameIng: 'test',
        nameWine: 'redWine',
        descWine: 'lorem ipsum',
        quantityIng: 5,
    },
    {
        idIng: 2,
        nameIng: 'test2',
        nameWine: 'whiteWine',
        descWine: 'lorem ipsum ada',
        quantityIng: 1,
    },
    {
        idIng: 3,
        nameIng: 'test3',
        nameWine: 'roséWine',
        descWine: 'lorem ipsum ada sprectrum',
        quantityIng: 3,
    },
    {
        idIng: 4,
        nameIng: 'test4',
        quantityIng: 10,
    },
];

const Recipe: FC = ({}) => {
    const [persons, setPersons] = useState('1');
    const datas: IPhotosDefinition = useLoaderData() as IPhotosDefinition;

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
                [APPNAME]
            </Typography>
            <Box
                component="img"
                sx={{ position: 'relative', margin: '1rem auto', width: '90%', height: 'auto' }}
                alt={datas.title}
                src={datas.url}
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
                    {mockIngredients.map((i) => (
                        <ListItem key={uuidv4()}>
                            <ListItemText primary={i.nameIng}></ListItemText>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {mockIngredients.map((i) => (
                        <ListItem key={uuidv4()}>
                            <ListItemText primary={i.quantityIng}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', marginLeft: '15%' }}>
                Suggested wines
            </Typography>
            <Box sx={{ display: 'flex', marginLeft: '17%' }}>
                <List>
                    {mockIngredients.map((i) => (
                        <ListItem key={uuidv4()}>
                            <ListItemText primary={i.nameWine} secondary={i.descWine}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Recipe;
