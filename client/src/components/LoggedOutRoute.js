import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useUser } from "./../state/authentication";

const PrivateRoute = ({ children, ...rest }) => {
  const [user] = useUser();
  return (
    <Route {...rest} render={() => (!user ? children : <Redirect to="/" />)} />
  );
};

export default PrivateRoute;
