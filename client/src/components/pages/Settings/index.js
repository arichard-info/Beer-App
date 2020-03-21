import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import { useUser } from "@/state/authentication";

const SettingsPage = ({ className }) => {
  const [, dispatch] = useUser();
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (err) {
      console.log(err);
    }
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
