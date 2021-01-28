import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./feed/feed.js";
import Home from "./home/home.js";
import LoginForm from "./accounts/login_form";
import SignupForm from "./accounts/signup_form";
import PrivateRoute from './hocs/private_route';
import Layout from "./hocs/authorisation";
import Room from './rooms/room';

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
          <Layout>
          <PrivateRoute exact path="/publicroom/:room_id" component={Room} />
            <PrivateRoute exact path="/feed" component={Feed} />
          </Layout>
        </Switch>
      </Router>
    </Provider>
  );
}
