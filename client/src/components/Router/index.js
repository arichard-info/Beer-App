import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CalendarProvider } from "./../../state/calendar";

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

const routes = [
  { path: "/", exact: true, rights: "loggedOut", render: () => <Login /> },
  {
    path: "/signup",
    exact: true,
    rights: "loggedOut",
    render: () => <Signup />
  },
  {
    path: "/login/reset/:token",
    exact: false,
    rights: "loggedOut",
    render: () => <Reset />
  },
  {
    path: "/login/forgot",
    exact: true,
    rights: "loggedOut",
    render: () => <Forgot />
  },
  {
    path: "/complete-profile",
    exact: true,
    rights: "toComplete",
    render: () => <CompleteProfile />
  },
  {
    path: "/home",
    exact: true,
    rights: "private",
    render: () => (
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    )
  },
  {
    path: "/profile",
    exact: true,
    rights: "private",
    render: () => <Profile />
  },
  {
    path: "/settings",
    exact: true,
    rights: "private",
    render: () => <Settings />
  }
];

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Layout loggedIn={user && !user.toComplete}>
        <Switch>
          {routes.map(({ rights, ...rest }, key) => {
            switch (rights) {
              case "private": {
                return <PrivateRoute key={key} {...rest} />;
              }
              case "loggedOut": {
                return <LoggedOutRoute key={key} {...rest} />;
              }
              case "toComplete": {
                return (
                  user &&
                  user.toComplete && <LoggedOutRoute key={key} {...rest} />
                );
              }
              default: {
                return <Route key={key} {...rest} />;
              }
            }
          })}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
