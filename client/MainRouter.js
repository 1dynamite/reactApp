import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import ProtectedRoute from './auth/ProtectedRoute'
import ProtectedRouteAdd from './auth/ProtectedRouteAdd'
import Menu from './core/Menu'
import Topics from './lesson/Topics'
import AddLesson from './lesson/Add'
import Actions from './lesson/Action'
import Update from './lesson/Update'
import Lesson from './lesson/Lesson'
import Example from './comments/Comments'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <ProtectedRouteAdd path="/topics/add" component={AddLesson}/>
        <Route path="/topics" component={Topics}/>
        <ProtectedRoute path="/topic/edit/:lessonId" component={Update}/>
        <ProtectedRoute path="/topic/actions/:lessonId" component={Actions}/>
        <Route path="/topic/:lessonId" component={Lesson}/>
        <Route path="/carousel" component={Example}/>
      </Switch>
    </div>)
}

export default MainRouter
