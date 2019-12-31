import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./Style/GlobalStyle";
import ThemeProvider from "./Style/ThemeProvider";

import Layout from "./Layout";

import Calendar from "./CalendarPage";
import Settings from "./SettingsPage";
import Profile from "./ProfilePage";
import Error from "./ErrorPage";

const App = () => (
  <ThemeProvider>
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
  </ThemeProvider>
);

export default App;
