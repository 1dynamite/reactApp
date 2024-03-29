import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
      position: "relative"
    },
    textfield: {
      marginTop: theme.spacing(1),
    },
    iconButton: {
        position: "absolute",
        right: 0,
        top: 0
    }
  }));

export default function TemplateItem({template, labels, delIcon=true, ...props}) {
    const classes = useStyles();
    const [deleteIcon, setIcon] = useState(false);

    const clickButton = () => {
        props.delete(props.index)
    }

    const mouseOver = () => {
        setIcon(delIcon)
    }

    const mouseOut = () => {
        setIcon(false)
    }

    const handleChange = (e) => {
        let nextState = {};
        if(props.hasOwnProperty('index'))
            nextState.index = props.index;
        if(typeof template == 'string')
            nextState.value = e.target.value;
        else {
            nextState.value = {[e.target.name]: e.target.value}
        }
        props.handleChange(nextState);
    }
    
    return (
    <Paper 
        className={classes.root} 
        variant="outlined" 
        onMouseOver={mouseOver} 
        onMouseOut={mouseOut}
    >
        {typeof template == "string" ? (
            <TextField
                label={labels}
                value={template}
                className={classes.textfield}  
                variant="filled" 
                fullWidth 
                size="small"
                onChange={handleChange}
            />
        ) : (
            Object.entries(template).map(([property, value]) => {
                let multiline = false;
                if(property === 'body')
                    multiline = true;
                return (
                    <TextField
                        key={property}
                        name={property}
                        label={labels[property]}
                        value={value}
                        className={classes.textfield}  
                        variant="filled" 
                        fullWidth 
                        size="small" 
                        onChange={handleChange}
                        multiline={multiline}
                        rows={8}
                    />
                )
            })
        )
        }
        <IconButton 
            className={classes.iconButton}
            onClick={clickButton} 
            color="secondary"
            style={{display: deleteIcon ? 'block' : 'none'}}
        >
            <DeleteForeverIcon/>
        </IconButton>
    </Paper>
    )
}
//<div dangerouslySetInnerHTML={{__html: '<h1>First &middot; Second</h1>'}} />