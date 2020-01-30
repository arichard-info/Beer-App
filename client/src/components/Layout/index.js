import React from "react";
import styled, { css } from "styled-components";

import Flashes from "./../Flashes";
import Nav from "./Nav";

const Layout = ({ className, loggedIn, children }) => {
  return (
    <div className={className}>
      <Flashes />
      {loggedIn ? (
        <>
          <header>
            <Nav />
          </header>
          <main>{children}</main>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default styled(Layout)(
  ({ loggedIn }) => css`
    ${loggedIn &&
      css`
        display: flex;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        & > header {
          flex: 33.33%;
        }
        & > main {
          flex: 66.66%;
        }
      `}

    ${!loggedIn &&
      css`
        height: 100%;
        max-width: 600px;
        width: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4rem;
      `}
  `
);
