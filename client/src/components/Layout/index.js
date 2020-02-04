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
  ({ loggedIn, theme: { device, colors } }) => css`
    ${loggedIn &&
      css`
        position: relative;
        z-index: 0;
        & > header {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: ${colors.white};
          z-index: 1;
          padding: 2rem 0;
        }
        @media ${device.gtMobile} {
          max-width: 90rem;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          & > header {
            width: calc(90rem / 3);
            top: 0;
            left: initial;
            border-right: 0.1rem solid ${colors.grey1};
          }
          & > main {
            width: 66.66%;
            margin-left: 33.33%;
          }
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
