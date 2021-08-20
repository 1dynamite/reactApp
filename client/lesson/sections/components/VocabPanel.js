import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import Definitions from './Definitions';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '520px',
        },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderRadius: '0.3rem',
        position: 'relative',
        marginBottom: theme.spacing(5),
    },
    item: {
        padding: theme.spacing(1),
    },
    position: {
        display: 'flex',
        justifyContent: 'center',
    },
    wrapper: {
        position: 'absolute',
        bottom: '-1px',
        height: '0',
        width: '100%'
    },
}))
const over = {
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    cursor: 'pointer'
}
const out = {
    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    cursor: 'auto'
}

export default ({vocabPanel}) => {
    const [panel, setPanel] = useState(false);
    const classes = useStyles();
    const [isOver, setIsOver] = useState(false);

    const handleClick = () => {
        if(panel) 
            setPanel(false);
        else setPanel(true);
    }
    const onmouseover = () => {
        setIsOver(true);
    }
    const onmouseout = () => {
        setIsOver(false);
    }
    return (
        <div className={classes.position}>
            <div 
                onClick={handleClick} 
                className={classes.container}
                style={isOver ? over : out}
                onMouseOver={onmouseover}
                onMouseOut={onmouseout}
            >
            {
                vocabPanel.words.map((word, index) => {
                    return (
                    <Typography 
                        key={index} 
                        className={classes.item}
                        variant='body1'
                    >
                        {word}
                    </Typography>
                    )
                })
            }
            <div className={classes.wrapper}>
                <Definitions 
                    defs={vocabPanel.definitions}
                    style={{maxHeight: panel ? '500px' : '0'}}
                />
            </div>
            </div>
        </div>
    )
}