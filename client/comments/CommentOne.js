import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Typography } from '@material-ui/core';
import computeRelativeDate from './computeRelativeDate'

const useStyles = makeStyles(theme => ({
    div: {
        display: 'flex',
        padding: theme.spacing(1),
        paddingLeft: 0,
        marginBottom: theme.spacing(1)
    },
    name: {
        fontWeight: '600',
        display: 'inline-block',
        marginRight: theme.spacing(1),
    },
    date: {
        display: 'inline-block',
        color: theme.palette.text.secondary
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    comment: {
        marginTop: '0.1rem',
    }
}))

export default (props) => {
    const classes = useStyles();
    const [minsPassed, setMinsPassed] = useState(0);

    useEffect(() => {
        setInterval(() => {setMinsPassed((prev) => prev + 1)}, 60000)
    }, [])
    return (
    <div className={classes.div}>
        <Avatar className={classes.avatar}>
            {props.name.charAt(0).toUpperCase()}
        </Avatar>
        <div>
            <Typography 
                className={classes.name}
                variant='subtitle2'
            >
                {props.name}
            </Typography>
            <Typography 
                className={classes.date}
                variant='subtitle2'
            >
                {computeRelativeDate(props.date)}
            </Typography>
            <Typography 
                className={classes.comment}
                variant='body1'
            >
                {props.body}
            </Typography>
        </div> 

    </div>
    )
}