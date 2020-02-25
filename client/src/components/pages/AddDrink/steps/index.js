import React from "react";
import Search from "./Search";

const SwitchSteps = {
  0: rest => <Search {...rest} />
};

export default ({ step, ...rest }) => {
  return step in SwitchSteps ? SwitchSteps[step](rest) : null;
};
