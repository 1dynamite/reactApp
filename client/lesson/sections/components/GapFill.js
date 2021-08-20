import { Button, Typography } from '@material-ui/core';
import React, {useLayoutEffect, useRef, useState} from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    input: {
        border: 'none',
        borderRadius: '3px',

        margin: `0 ${theme.spacing(1)}px`,
        '&:focus' : {
            boxShadow: `0 0 2px 1px ${theme.palette.primary.light}`,
            outline: 'none'
        },
        ...theme.typography.body1
    },
    button: {
        marginRight: theme.spacing(2),
        marginTop: `-${theme.spacing(2)}px`,
        fontSize: '0.75rem',
        padding: `0.25rem 0.65rem` 

    },
    div: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: theme.spacing(4)
    },
    stats: {
        marginTop: `-${theme.spacing(2)}px`,
    }
}))

export default (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const reference = useRef(null);
    const [cmp, setCmp] = useState(props.children);
    const [reset, setReset] = useState(false);
    const [pony, setPony] = useState(0);
    const [bunny, setBunny] = useState(0);

    useEffect(() => {
        const newState = React.cloneElement(props.children, {reference: reference})
        setCmp(newState)
    }, [])
    useLayoutEffect(() => {
        if(reference.current){
            for(let i of reference.current.children)
        {
            if(i.tagName == 'LI'){
                for(let it of i.children){
                    it.className = classes.input;
                }
            }
            else {
                i.className = classes.input;
            }
        }
        }
    })
    const handleSubmit = (e) => {
        let p = 0;
        let b = 0;
        for(let i of reference.current.children)
        {
            if(i.tagName == 'LI'){
                b += i.children.length;
                for(let it of i.children){
                    if(it.dataset.correctvalue != it.value)
                        it.style.outline = `2px solid ${theme.palette.secondary.main}`
                    else {
                        it.style.outline = 'none'
                        p += 1;
                    }
                }
            }
            else {
                b += 1;
                if(i.dataset.correctvalue != i.value)
                    i.style.outline = `2px solid ${theme.palette.secondary.main}`
                else {
                    i.style.outline = 'none'
                    p += 1;
                }
            }
        }
        setPony(p);
        setBunny(b);
        setReset(true);
    }
    const handleReset = () => {
        for(let i of reference.current.children)
        {
            let elem = i.tagName == 'LI' ? i.firstElementChild : i;

            if(i.tagName == 'LI'){
                for(let it of i.children){
                    it.style.outline = 'none'
                    it.value = '';
                }
            }
            else {
                i.value = '';
                i.style.outline = 'none';   
            }
        }
        setReset(false);
    }
    return (
        <div>
        {cmp}
        <div className={classes.div}>
        <Button
            className={classes.button}
            onClick={handleSubmit}
            variant='contained'
            color='primary'
        >
            SUBMIT
        </Button>
        {
            reset ? (<>
                <Button
                    className={classes.button}
                    onClick={handleReset}
                    variant='outlined'
                    color='primary'
                >
                    RESET
                </Button>
                <Typography className={classes.stats}>
                    {pony}/{bunny} correct answers
                </Typography></>
            ) : ''
        }
        </div>
    </div>
    )
}

{/* <Questions reference={reference}>
    {"<li>This is a <input data-correctvalue='outlet'/></li>"}
</Questions> */}