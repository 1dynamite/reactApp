import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    item: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '360px',
        },
        [theme.breakpoints.up('sm')]: {
            height: '390px',
        },
        [theme.breakpoints.up('md')]: {
            height: '420px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '480px',
        },
        objectFit: 'cover'
    },
    description: {
        bottom: theme.spacing(2),
        position: 'absolute',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: theme.spacing(1),
        left: '50%',
        transform: 'translate(-50%, 0)',
    },
    title: {
        top: theme.spacing(3),
        position: 'absolute',
        color: 'white',
        left: '50%',
        transform: 'translate(-50%, 0)',
    }
  }))

export default ({items}) =>
{
    return (
        <Carousel
            next={() => {}}
            prev={() => {}}
            autoPlay={true}
            fullHeightHover={false}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{style: {backgroundColor: 'black', opacity: '0.7'}}}
            navButtonsWrapperProps={{style: {top: '50%', transform: 'translate(0, -70%)'}}}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}


function Item(props) {
    const classes = useStyles();
    //const [source, setSource] = useState(undefined);

    /* useEffect(() => {
        fetch(props.item.source)
        .then(data => data.blob())
        .then(data => {
            const src = URL.createObjectURL(data);
            setSource(src)
        })
    }, [props.item.source]) */

    return (
        <Paper 
            variant='outlined'
            style={{position: 'relative', padding: '0.5rem'}}>
            <img src={props.item.imagePath} className={classes.item}/>
            <Typography 
                variant='caption'
                className={classes.description}
            >
                {props.item.description}
            </Typography>
            <Typography
                variant='body1' 
                className={classes.title}
            >
                {props.item.title}
            </Typography>

        </Paper>
    )
}