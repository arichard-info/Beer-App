import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from "./Layout";

import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import HomeScreen from "./pages/HomeScreen";
import Forgot from "./pages/LoginPage/Forgot";
import Reset from "./pages/LoginPage/Reset";
import Signup from "./pages/Signup";

const Router = ({ user }) => {
  if (user && user !== null) {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Calendar />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/login/reset/:token">
          <Reset />
        </Route>
        <Route exact path="/login/forgot">
          <Forgot />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
