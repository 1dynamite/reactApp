import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    me: {
        borderRadius: '0.5rem',
        backgroundColor: theme.palette.gray,
        padding: theme.spacing(1),
        lineHeight: '2rem',
        marginBottom: theme.spacing(4)
    }
}))


export default (props) => {
    const classes = useStyles();
    return (
        <Typography 
            variant='body1'
            className={classes.me}
            ref={props.reference}
            dangerouslySetInnerHTML={{__html: props.children}}
        />
    )
}