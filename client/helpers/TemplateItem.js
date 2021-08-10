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

export default function TemplateItem({textFields}) {
    const classes = useStyles();
    const [deleteIcon, setIcon] = useState(false);

    const clickButton = () => {

    }

    const mouseOver = () => {
        setIcon(true)
    }

    const mouseOut = () => {
        setIcon(false)
    }
    
    return (
    <Paper className={classes.root} variant="outlined" onMouseOver={mouseOver} onMouseOut={mouseOut}>
        {textFields.map((label, index) => {
            return (
                <TextField
                    key={index}
                    label={label}
                    className={classes.textfield}  
                    variant="filled" 
                    fullWidth 
                    size="small" 
                />
            )
        })}
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