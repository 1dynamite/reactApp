import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core';
import auth from '../auth/auth-helper'
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
    div: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginBottom: theme.spacing(1),
    },
    button: {
        alignSelf: 'flex-end',
        marginLeft: theme.spacing(2)
    },
    message: {
        alignSelf: 'flex-end'
    },
    errorIcon: {
        marginRight: theme.spacing(1),
        alignSelf: 'flex-end'
    }
}));

export default (props) => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [message, setMessage] = useState(false)

    const abortController = new AbortController()
    const signal = abortController.signal

    useEffect(() => {
        return function cleanup(){
            abortController.abort()
          }
    })
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleClick = () => {
        const jwt = auth.isAuthenticated();
        if(!jwt) {
            setMessage(true);
            return;
        }
        setMessage(false)
        fetch('/api/comments/', {
            method: 'POST',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            },
            body: JSON.stringify({
                body: value,
                lessonId: 'globalization'
            })
        }).then((data) => data.json()).then((data) => {
            props.handleP(data);
            setValue('');
        })
    }

    return (
        <div className={classes.div}>
        <TextField 
            className={classes.textField}
            multiline
            label='Add a comment...'
            fullWidth
            value={value}
            onChange={handleChange}
        />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            {
                message ? (<>
                    <ErrorIcon color='error' className={classes.errorIcon}/>
                    <Typography 
                        color='error'
                        variant='body1'
                        className={classes.message}
                    >
                        You must be logged in to post comments
                    </Typography></>
                ) : ''
            }
            <Button
                color='primary'
                variant='contained'
                className={classes.button}
                size='small'
                onClick={handleClick}
                disabled={value === ''}
            >
                SUBMIT
            </Button>
        </div>
        </div>
    )
}