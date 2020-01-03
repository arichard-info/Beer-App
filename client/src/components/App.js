import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { UserProvider, useUser } from "./../state/authentication";
import GlobalStyle from "./Style/GlobalStyle";
import ThemeProvider from "./Style/ThemeProvider";

import LoggedOutRoute from "./LoggedOutRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "./Layout";

import Loading from "./LoadingPage";
import Calendar from "./CalendarPage";
import Settings from "./SettingsPage";
import Profile from "./ProfilePage";
import Login from "./LoginPage";
import Error from "./ErrorPage";

const App = () => {
  const [, dispatch] = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const authToken = window.localStorage.getItem("auth_token");
      if (authToken) {
        try {
          const checkToken = await axios.post(
            `/api/verify-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`
              }
            }
          );
          if (
            checkToken &&
            checkToken.status === 200 &&
            checkToken.data &&
            checkToken.data.user
          ) {
            dispatch({
              type: "INIT",
              value: { user: checkToken.data.user, token: authToken }
            });
          }
        } catch (err) {
          console.error("Invalid user token");
        }
      }

      setLoading(false);
    }
    checkAuth();
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <LoggedOutRoute exact path="/login">
              <Login />
            </LoggedOutRoute>
            <Route path="*">
              <Layout>
                <Switch>
                  <PrivateRoute exact path="/">
                    <Calendar />
                  </PrivateRoute>
                  <PrivateRoute path="/profile">
                    <Profile />
                  </PrivateRoute>
                  <PrivateRoute path="/settings">
                    <Settings />
                  </PrivateRoute>
                  <Route path="*">
                    <Error />
                  </Route>
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default () => (
  <UserProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </UserProvider>
);
