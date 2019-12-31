import React from "react";
import styled, { css } from "styled-components";

const ErrorPage = ({ className }) => {
  return (
    <div className={className}>
      <h1>404 : Not found</h1>
    </div>
  );
};

export default styled(ErrorPage)(() => css``);
