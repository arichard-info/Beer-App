import React from "react";
import { Switch } from "react-router-dom";
import CustomRoute from "./CustomRoute";

const Router = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, key) => (
        <CustomRoute {...route} key={key} />
      ))}
    </Switch>
  );
};

export default Router;
