import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home/home.js';

export default function App(props) {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );    
}
