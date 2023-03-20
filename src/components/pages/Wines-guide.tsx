import { FC } from 'react';
import '../../index.css';
import List from '@mui/material/List';
import { Box, Grid, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { v4 as uuidv4 } from 'uuid';

const winesTypes = [
    {
        wine: 'White wine',
        subtypes: [
            {
                subtype: 'Dry white wine',
                varietals: [
                    'assyrtiko',
                    'pinot_blanc',
                    'cortese',
                    'roussanne',
                    'moschofilero',
                    'muscadet',
                    'viognier',
                    'verdicchio',
                    'greco',
                    'marsanne',
                    'white_burgundy',
                    'chardonnay',
                    'gruener_veltliner',
                    'white_rioja',
                    'frascati',
                    'gavi',
                    'l_acadie_blanc',
                    'trebbiano',
                    'sauvignon_blanc',
                    'catarratto',
                    'albarino',
                    'arneis',
                    'verdejo',
                    'vermentino',
                    'soave',
                    'pinot_grigio',
                    'dry_riesling',
                    'torrontes',
                ],
            },
            {
                subtype: 'Sweet white wine',
                varietals: [
                    'mueller_thurgau',
                    'grechetto',
                    'gewurztraminer',
                    'chenin_blanc',
                    'white_bordeaux',
                    'semillon',
                    'riesling',
                    'sauternes',
                    'sylvaner',
                    'lillet_blanc',
                ],
            },
        ],
    },
    {
        wine: 'Red wine',
        subtypes: [
            {
                subtype: 'Dry red wine',
                varietals: [
                    'petite_sirah',
                    'zweigelt',
                    'baco_noir',
                    'bonarda',
                    'cabernet_franc',
                    'bairrada',
                    'barbera_wine',
                    'primitivo',
                    'pinot_noir',
                    'nebbiolo',
                    'dolcetto',
                    'tannat',
                    'negroamaro',
                    'red_burgundy',
                    'corvina',
                    'rioja',
                    'cotes_du_rhone',
                    'grenache',
                    'malbec',
                    'zinfandel',
                    'sangiovese',
                    'carignan',
                    'carmenere',
                    'cesanese',
                    'cabernet_sauvignon',
                    'aglianico',
                    'tempranillo',
                    'shiraz',
                    'mourvedre',
                    'merlot',
                    'nero_d_avola',
                ],
            },
            {
                subtype: 'Sweet red wine',
                varietals: [
                    'bordeaux',
                    'marsala',
                    'port',
                    'gamay',
                    'dornfelder',
                    'concord_wine',
                    'sparkling_red_wine',
                    'pinotage',
                    'agiorgitiko',
                ],
            },
        ],
    },
    {
        wine: 'Dessert wine',
        varietals: [
            'pedro_ximenez',
            'moscato',
            'late_harvest',
            'ice_wine',
            'white_port',
            'lambrusco_dolce',
            'madeira',
            'banyuls',
            'vin_santo',
            'port',
        ],
    },
    {
        wine: 'Rose wine',
        varietals: ['sparkling_rose'],
    },
    {
        wine: 'Sparkling wine',
        varietals: ['cava', 'cremant', 'champagne', 'prosecco', 'spumante', 'sparkling_rose'],
    },
    {
        wine: 'Sherry',
        varietals: ['cream_sherry', 'dry_sherry'],
    },
    {
        wine: 'Vermouth',
        varietals: ['dry_vermouth'],
    },
];

const WinesGuide: FC = ({}) => {
    return (
        <Box>
            {winesTypes.map((i) => (
                <>
                    <Typography variant="h2" fontSize="1.5rem">
                        {i.wine}
                    </Typography>

                    <Grid container columns={2} spacing={1}>
                        {i.subtypes &&
                            i.subtypes.map((e) => (
                                <>
                                    <Grid xs={1}>
                                        <Typography variant="h4" fontSize="1.25rem" key={uuidv4()}>
                                            {e.subtype}
                                        </Typography>
                                        {e.varietals &&
                                            e.varietals.map((v) => <ListItemText key={uuidv4()} secondary={v} />)}
                                    </Grid>
                                </>
                            ))}
                    </Grid>
                    <Box className="wine__guide--container">
                        <List>
                            {i.varietals && i.varietals.map((v) => <ListItemText key={uuidv4()} secondary={v} />)}
                        </List>
                    </Box>
                </>
            ))}
        </Box>
    );
};

export default WinesGuide;
