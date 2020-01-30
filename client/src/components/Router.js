import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from "./Layout";
import LoggedOut from "./Layout/LoggedOut";

import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Forgot from "./pages/Login/Forgot";
import Reset from "./pages/Login/Reset";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/Signup/CompleteProfile";

const Router = ({ user }) => {
  if (user && user !== null) {
    if (user.toComplete) {
      return (
        <BrowserRouter>
          <LoggedOut>
            <Switch>
              <Route exact path="/">
                <CompleteProfile />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </LoggedOut>
        </BrowserRouter>
      );
    }
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
      <LoggedOut>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
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
      </LoggedOut>
    </BrowserRouter>
  );
};

export default Router;
