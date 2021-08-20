import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    ul: {
        marginBottom: '2rem',
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.gray,
        listStyleType: 'none',
        padding: '10px 20px',
        '& li': {
            ...theme.typography.body1,
            margin: '0.5rem 0.3rem'
        }
    }
}))

export default function Questions(props) {
    const classes = useStyles();
    return (
        <ul ref={props.reference}
            className={classes.ul}
            dangerouslySetInnerHTML={{__html: props.children}}
        />
    )
}