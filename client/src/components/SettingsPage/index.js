import React from "react";
import styled, { css } from "styled-components";

const SettingsPage = ({ className }) => {
  return (
    <div className={className}>
      <h1>Settings Page</h1>
    </div>
  );
};

export default styled(SettingsPage)(() => css``);
