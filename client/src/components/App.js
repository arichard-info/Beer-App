import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import GlobalStyle from "./GlobalStyle";

import Layout from "./Layout";

import Calendar from "./CalendarPage";
import Settings from "./SettingsPage";
import Profile from "./ProfilePage";
import Error from "./ErrorPage";

const App = () => (
  <Router>
    <Layout>
      <GlobalStyle />
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
          <Error />
        </Route>
      </Switch>
    </Layout>
  </Router>
);

export default App;
