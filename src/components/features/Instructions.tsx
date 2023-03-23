import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { instructions } from '../../interfaces/recipesInterfaces';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IInstructions {
    instructions: instructions[];
}

const Instructions = ({ instructions }: IInstructions) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleExpand = (step: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? step : false);
    };

    return (
        <>
            <Typography variant="h2" fontSize="1.25rem" className="recipe--details--subtitle">
                Cooking instructions
            </Typography>
            <Box className="recipe--details--instructions">
                {instructions.map((i) =>
                    i.steps.map((s) => (
                        <Accordion
                            key={uuidv4()}
                            expanded={expanded === s.number.toString()}
                            onChange={handleExpand(s.number.toString())}
                            className="recipe--details--instructions--accordion"
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className="recipe--details--instructions--accordion"
                            >
                                <Typography
                                    variant="h4"
                                    fontSize="1rem"
                                    key={uuidv4()}
                                    className="recipe--details--instructions--accordion--step"
                                >
                                    {`Step ${s.number}`}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                className="recipe--details--instructions--accordion--details"
                                classes={{ root: 'bg-beige' }}
                            >
                                <Typography key={uuidv4()} className="recipe--details--instructions--accordion--text">
                                    {s.step}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )),
                )}
            </Box>
        </>
    );
};

export default Instructions;
