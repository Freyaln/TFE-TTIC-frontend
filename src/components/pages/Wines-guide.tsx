import { FC, useState } from 'react';
import '../../index.css';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import DetailWine from '../features/DetailWine';

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
    const [open, setOpen] = useState<boolean>(false);
    const [selectedVarietal, setSelectedVarietal] = useState<string>('');
    const handleOpen = (variety: string) => {
        setSelectedVarietal(variety);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedVarietal('');
        setOpen(false);
    };

    const formattedWinesTypes = winesTypes.map((wineType) => {
        const formattedSubtypes = wineType.subtypes
            ? wineType.subtypes.map((subtype) => ({
                  subtype: subtype.subtype,
                  varietals: subtype.varietals.map((varietal) => varietal.replace(/_/g, ' ')),
              }))
            : null;
        const formattedVarietals = wineType.varietals
            ? wineType.varietals.map((varietal) => varietal.replace(/_/g, ' '))
            : null;

        return {
            wine: wineType.wine,
            subtypes: formattedSubtypes,
            varietals: formattedVarietals,
        };
    });

    return (
        <>
            <Grid container spacing={2}>
                {formattedWinesTypes.map((i) => (
                    <Grid item xs={6} md={6} key={uuidv4()}>
                        <section className="wine__guide--subcontainer">
                            <Typography variant="h2" fontSize="1.5rem">
                                {i.wine}
                            </Typography>
                            {i.subtypes &&
                                i.subtypes.map((e) => (
                                    <article key={uuidv4()}>
                                        <Typography variant="h4" fontSize="1.25rem">
                                            {e.subtype}
                                        </Typography>
                                        {e.varietals &&
                                            e.varietals.map((v) => (
                                                <div key={uuidv4()}>
                                                    <Button onClick={() => handleOpen(v)} key={uuidv4()}>
                                                        {'- ' + v.toUpperCase()}
                                                    </Button>
                                                </div>
                                                // <Link
                                                //     to={`/wines-guide/${v}`}
                                                //     key={uuidv4()}
                                                //     className="wine__guide--links"
                                                // >
                                                //     {'- ' + v.toUpperCase()}
                                                // </Link>
                                            ))}
                                    </article>
                                ))}
                            <article key={uuidv4()}>
                                {i.varietals &&
                                    i.varietals.map((v) => (
                                        <Link to={`/:${v}`} key={uuidv4()} className="wine__guide--links">
                                            {'- ' + v.toUpperCase()}
                                        </Link>
                                    ))}
                            </article>
                        </section>
                    </Grid>
                ))}
            </Grid>
            <DetailWine open={open} name={selectedVarietal} onClose={handleClose} />
        </>
    );
};

export default WinesGuide;
