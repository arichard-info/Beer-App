import React from "react";
import styled, { css } from "styled-components";

const ProfilePage = ({ className }) => {
  return (
    <div className={className}>
      <h1>Profile page</h1>
    </div>
  );
};

export default styled(ProfilePage)(() => css``);
