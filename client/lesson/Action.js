import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteLesson from './DeleteLesson'
import {read} from './api-lesson.js'
import {Link} from 'react-router-dom'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

export default function Actions({ match }) {
  const classes = useStyles()
  const [lesson, setLesson] = useState({})

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read(signal, match.params.lessonId).then((data) => {
      if (data && !data.error) {
        setLesson(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.lessonId])
  
    let topic = match.params.lessonId.charAt(0).toUpperCase() + match.params.lessonId.slice(1);
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Topic
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
                <Avatar>{topic.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={topic} 
                secondary={new Date(lesson.created).toDateString()}
                primaryTypographyProps={{
                    variant: "subtitle1",
                    color: "textPrimary"
                }}
            /> 
            <ListItemSecondaryAction>
                <Link to={"/topic/edit/" + lesson._id}>
                <IconButton aria-label="Edit" color="primary">
                    <Edit/>
                </IconButton>
                </Link>
                <DeleteLesson lessonId={lesson._id}/>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider/>
        </List>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Link to={"/topic/" + lesson._id}>
            <Button
                variant="contained"
                endIcon={<ArrowForwardIcon/>}
                color="primary"
                style={{margin: '1rem 1rem -0.5rem 0'}}
            >
                VIEW
            </Button>
        </Link>
        </div>
      </Paper>
    )
  }