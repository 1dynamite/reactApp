import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        border: `2px solid #eeeeee`,
        borderRadius: '0.5rem',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(5)
        
    },
    heading: {
    },
    subtitle: {
        marginBottom: '1rem',
        fontStyle: 'italic'
    },
    body: {
        alignSelf: 'flex-start'
    }
}))

export default (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography 
                className={classes.heading} 
                variant='h6'
            >
                {props.passage.title}
            </Typography>
            <Typography 
                className={classes.subtitle} 
                variant='subtitle1'
            >
                {props.passage.subtitle}
            </Typography>
            <Typography 
                className={classes.body} 
                variant='body1'
            >
                {props.passage.body}
            </Typography>
        </div>
    )
}