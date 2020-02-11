import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "./../../state/authentication";

const CustomRoute = route => {
  const { rights, ...rest } = route;
  const [user] = useUser();

  if (user && user.toComplete && rights !== "toComplete")
    return <Redirect to="to-complete" />;
  if (user && rights !== "private") return <Redirect to="/home" />;
  if (!user && rights !== "loggedOut") return <Redirect to="/" />;

  return <Route {...rest} />;
};

export default CustomRoute;
