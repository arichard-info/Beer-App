import React from "react";
import styled, { css } from "styled-components";

const LoadingPage = ({ className }) => {
  return (
    <div className={className}>
      <h1>Loading ...</h1>
    </div>
  );
};

export default styled(LoadingPage)(() => css``);
