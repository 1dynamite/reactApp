import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
accordion: {
    boxShadow: theme.shadows[2]
}
}));

export default function MyAccordion(props) {
  const classes = useStyles();

  return (
    <Accordion className={classes.accordion}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{props.heading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {props.children}
        </AccordionDetails>
    </Accordion>
  );
}
