import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  
}))

export default function Home(){
  const classes = useStyles()
    return (
      <Redirect to={'/topic/globalization/'}/>
    )
}

