import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./Style/GlobalStyle";
import ThemeProvider from "./Style/ThemeProvider";

import PrivateRoute from "./PrivateRoute";
import Layout from "./Layout";

import Calendar from "./CalendarPage";
import Settings from "./SettingsPage";
import Profile from "./ProfilePage";
import Login from "./LoginPage";
import Error from "./ErrorPage";

const App = () => (
  <ThemeProvider>
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <Layout>
          <GlobalStyle />

          <Route exact path="/" render={() => <Calendar />} />
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Layout>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
