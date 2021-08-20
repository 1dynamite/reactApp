import React, {useState, useEffect} from 'react';
import Questions from './Questions'
import Paragraph from './Paragraph'
import GapFill from './GapFill'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
    typoe: {
        fontWeight: '500',
        fontSize: "1rem",
        lineHeight: '1.5',
        letterSpacing: "0.00938em",
        borderBottom: '2px solid orange',
        width: 'max-content',
        display: 'inline-block'
    },
    icon:{
        color: theme.palette.primary.main,
        marginRight: '0.3rem'
    },
    div: {
        display: 'flex',
        margin: '1rem 0'
    }
}))

function stringToJSX(str){
    let res = str.match(/(<(?<type>\w+)>(?<content>.*)<\/\k<type>>)/)
    if(res === null) return str;
    if(res.groups.type == 'GapFill')
        return <GapFill>{stringToJSX(res.groups.content)}</GapFill>
    if(res.groups.type == 'Questions')
        return <Questions>{stringToJSX(res.groups.content)}</Questions>
    else if(res.groups.type == 'Paragraph')
        return <Paragraph>{stringToJSX(res.groups.content)}</Paragraph>
    else return str
   
}

export default (props) => {
    const classes = useStyles();
    return (
        <>  
            <div className={classes.div}>
                <AssignmentIcon className={classes.icon}/>
                <Typography 
                    variant='h6'
                    className={classes.typoe}
                >
                    {props.heading}
                </Typography>
            </div>
            {stringToJSX(props.body)}
        </>
    
    )
}
//"<GapFill><Questions><li>This is a <input data-correctvalue='outlet'/> and a <input data-correctvalue='stainway'/></li><li>Some other <input data-correctvalue='beach'/></li></Questions></GapFill>"