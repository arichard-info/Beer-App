import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = true;

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? { children } : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
