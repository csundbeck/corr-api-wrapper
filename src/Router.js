import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './components/Home'
import UserManagement from './components/UserManagement'
import Inventory from './components/Inventory'
import Company from './components/Company'
import Login from './components/Login'
import Tabs from './components/Tabs'
import { Redirect } from 'react-router'
import cookie from 'cookie'

require('dotenv').config();


const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] ? true : false
}

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => checkAuth()
            ? <Component {...props} />
            : <Redirect to="/login" />}
        />
    )
}

const Router = () => {
    return (
        <div>
            <Switch>
                <Route path="/Login" component={Login}/>
                <Route exact path="/" component={Home}/>
                <ProtectedRoute exact path="/UserManagement" component={UserManagement} />
                <ProtectedRoute exact path="/Home" component={Home} />
                <ProtectedRoute exact path="/Inventory" component={Inventory} />
                <ProtectedRoute exact path="/CompanyDatabase" component={Company} />
            </Switch>
        </div>
    )
}

export default Router;