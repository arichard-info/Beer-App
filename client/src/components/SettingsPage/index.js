import React from "react";
import styled, { css } from "styled-components";

import { useUser } from "./../../state/authentication";

const SettingsPage = ({ className }) => {
  const [, dispatch] = useUser();

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };
  return (
    <div className={className}>
      <h1>Settings Page</h1>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default styled(SettingsPage)(() => css``);
