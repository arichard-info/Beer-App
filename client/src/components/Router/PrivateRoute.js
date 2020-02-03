import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useUser } from "./../../state/authentication";

const PrivateRoute = ({ children, ...rest }) => {
  const [user] = useUser();
  if (user && user.toComplete)
    return (
      <Route {...rest}>
        <Redirect to="/complete-profile" />
      </Route>
    );
  if (user) {
    return <Route {...rest}>{children}</Route>;
  }
  return (
    <Route {...rest}>
      <Redirect to="/" />
    </Route>
  );
};

export default PrivateRoute;
