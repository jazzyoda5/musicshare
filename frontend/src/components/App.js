import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home/home.js";
import LoginForm from "./accounts/login_form";
import SignupForm from "./accounts/signup_form";

import { Provider } from "react-redux";
import store from "../store";

export default function App(props) {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
