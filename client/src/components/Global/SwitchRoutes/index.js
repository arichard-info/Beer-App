import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Router = ({ routes }) => {
  const user = useSelector((state) => state.user);
  return (
    <Switch>
      {routes.map((route, key) => {
        const { rights, ...rest } = route;

        if (user && rights !== "private")
          return (
            <Route key={key} path={route.path} exact={route.exact}>
              <Redirect to="/home" />
            </Route>
          );
        if (!user && rights !== "loggedOut")
          return (
            <Route key={key} path={route.path} exact={route.exact}>
              <Redirect to="/" />
            </Route>
          );

        return <Route key={key} {...rest} />;
      })}
    </Switch>
  );
};

export default Router;
