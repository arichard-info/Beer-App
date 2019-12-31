import React from "react";
import styled, { css } from "styled-components";

import Nav from "./Nav";

const Layout = ({ className, children }) => {
  return (
    <div className={className}>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default styled(Layout)(
  () => css`
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    & > header {
      flex: 33.33%;
    }
    & > main {
      flex: 66.66%;
    }
  `
);
