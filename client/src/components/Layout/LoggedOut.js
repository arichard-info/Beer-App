import React from "react";
import styled, { css } from "styled-components";

const Layout = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(Layout)(
  () => css`
    height: 100%;
    max-width: 600px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
  `
);
