import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        borderRadius: '0.3rem',
        boxShadow: theme.shadows[2],
        padding: `0 ${theme.spacing(2)}px`,
        overflow: 'hidden',
        transition: 'max-height 0.5s',
        backgroundColor: 'white'
    },
    dd: {
        ...theme.typography.body1
    },
    dt: {
        ...theme.typography.body1,
        fontWeight: '600'
    },
}))

export default (props) => {
    const classes = useStyles();

    const stopPropagation = (e) => {
        e.stopPropagation();
    }
    return (
        <div 
            onClick={stopPropagation}
            style={props.style} 
            className={classes.container}
            onMouseOver={stopPropagation}
            onMouseOut={stopPropagation}
        >
            <dl>
                {
                    props.defs.map((item) => {
                        return (
                            <>
                            <dt className={classes.dt}>{item.word}</dt>
                            <dd className={classes.dd}>{item.definition}</dd>
                            </>
                        )
                    })
                }
            </dl>
        </div>
    )
}
