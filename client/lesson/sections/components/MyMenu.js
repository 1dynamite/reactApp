import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    menu: {
        position: 'fixed',
        top: '30vh',
        left: '0',
        boxShadow: theme.shadows[3],
        zIndex: '1',
        backgroundColor: 'white',
        transition: 'max-width 0.5s',
        [theme.breakpoints.down('md')]: {
            display: 'block',
          },
          [theme.breakpoints.up('md')]: {
            display: 'none',
          }
    },
    iconButton: {
        top: '0',
        right: '0',
        borderRadius: '0',
        padding: '0.6rem 0.2rem 0.6rem 0.6rem',
        backgroundColor: 'white',
        boxShadow: theme.shadows[2],
    },
    icon: {
        fontSize: '1rem'
    },
    wrapper: {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '0'
    }
  }));

export default (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () =>{
        if(isOpen)
            setIsOpen(false)
        else setIsOpen(true)
    }
    return (
        <div 
            className={classes.menu}
            style={{maxWidth: isOpen ?'600px' : '0'}}
        >
            {props.children}
            <div className={classes.wrapper}>
                <IconButton 
                    onClick={handleClick}
                    className={classes.iconButton}
                    size='small'
                >
                    {
                        isOpen ? <ArrowBackIosIcon className={classes.icon}/> :
                            <ArrowForwardIosIcon className={classes.icon}/>
                    }
                </IconButton>
            </div>
        </div>
    )
}