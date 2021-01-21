import React, { useState } from 'react';
import './App.css';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home/home.js';
import LoginForm from './accounts/login_form';

export default function App(props) {
    const [loggedIn, setLoggedIn] = useState(null);
    
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <LoginForm />
                    </Route>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );    
}
