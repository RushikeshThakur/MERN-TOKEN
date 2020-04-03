import React, { Component } from 'react'
import {Route, Switch, Redirect } from 'react-router-dom';
import Login from "./Login"
import Registration from "./Registration"
import AfterLogin from "../component/AfterLogin"


class MainComponent extends Component {
    constructor(props){
        super(props);
        this.state={ 

        }
    }
    
    render() {
        return (
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Registration}></Route>
                <Route exact path="/dashboard/AfterLogin" component={AfterLogin}></Route>
                <Redirect to="/login"/>
            </Switch>
        )
    }
}

export default MainComponent;
