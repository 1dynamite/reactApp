import React, {useState, useEffect} from 'react'
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
import ArrowForward from '@material-ui/icons/ArrowForward'
import {Link} from 'react-router-dom'
import {list} from './api-lesson.js'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import auth from '../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  addLesson: {
    marginBottom: theme.spacing(2),
    padding: `${theme.spacing(1)}px 0`
  }
}))

export default function Topics() { 
  const classes = useStyles()
  const [topics, setTopics] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    auth.isAdmin().then((data) => {
      setIsAdmin(data)
    })

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setTopics(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [])

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Topics
      </Typography>
      <List dense>
        {
          isAdmin ? (
            <Link to="/topics/add/">
              <Button
                className = {classes.addLesson}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth={true}
                startIcon={<AddIcon />}
              >
                Add a new lesson
              </Button>
            </Link>
          ) : ''
        }
       {topics.map((item, i) => {
         let topic = item._id.charAt(0).toUpperCase() + item._id.slice(1);
        return <Link to={"/topic/actions/" + item._id} key={i}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>{topic.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={topic} 
                      secondary={new Date(item.created).toDateString()}
                      primaryTypographyProps={{
                        variant: "subtitle1",
                        color: "textPrimary"
                      }}
                    />
                    <ListItemSecondaryAction>
                    <IconButton>
                        <ArrowForward/>
                    </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
               </Link>
             })
           }
      </List>
    </Paper>
  )
}
