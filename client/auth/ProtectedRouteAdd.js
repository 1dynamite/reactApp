import React, { Component, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const ProtectedRouteAdd = ({ component: Component, ...rest }) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {
        auth.isAdmin().then((data) => {
            setIsAdmin(data)
            setDidMount(true)
          })
    },[])
    return didMount ? (
        <Route {...rest} render={props => (
          isAdmin ? (
            <Component {...props}/>
          ) : (
            <Redirect to={{
              pathname: '/topics',
              state: { from: props.location }
            }}/>
          )
        )}/>
      ) : ''
}

export default ProtectedRouteAdd
