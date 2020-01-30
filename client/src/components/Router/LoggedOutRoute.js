import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useUser } from "./../../state/authentication";

const LoggedOutRoute = ({ children, ...rest }) => {
  const [user] = useUser();
  if (!user)
    return (
      <Route {...rest}>
        <Route {...rest}>{children}</Route>
      </Route>
    );

  return (
    <Route {...rest}>
      <Redirect to="/home" />
    </Route>
  );
};

export default LoggedOutRoute;
