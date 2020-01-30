import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Layout from "./../Layout";
import PrivateRoute from "./PrivateRoute";
import LoggedOutRoute from "./LoggedOutRoute";

import Calendar from "./../pages/Calendar";
import Settings from "./../pages/Settings";
import Profile from "./../pages/Profile";
import Login from "./../pages/Login";
import Forgot from "./../pages/Login/Forgot";
import Reset from "./../pages/Login/Reset";
import Signup from "./../pages/Signup";
import CompleteProfile from "./../pages/Signup/CompleteProfile";

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Layout loggedIn={user && !user.toComplete}>
        <Switch>
          <LoggedOutRoute exact path="/">
            <Login />
          </LoggedOutRoute>
          <LoggedOutRoute exact path="/signup">
            <Signup />
          </LoggedOutRoute>
          <LoggedOutRoute path="/login/reset/:token">
            <Reset />
          </LoggedOutRoute>
          <LoggedOutRoute exact path="/login/forgot">
            <Forgot />
          </LoggedOutRoute>
          <PrivateRoute exact path="/complete-profile">
            <CompleteProfile />
          </PrivateRoute>
          <PrivateRoute exact path="/home">
            <Calendar />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
