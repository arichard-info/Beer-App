import React from "react";
import styled, { css } from "styled-components";

const LoadingPage = ({ className }) => {
  return (
    <div className={className}>
      <div class="loader" />
    </div>
  );
};

export default styled(LoadingPage)(
  ({ theme: { colors } }) => css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loader {
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
      position: relative;
      margin: 0 auto;
    }

    .loader:before {
      content: "";
      position: absolute;
      top: -1rem;
      left: -1rem;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 1rem solid transparent;
      border-top-color: ${colors.primary};
    }

    .loader:before {
      z-index: 100;
      animation: spin 1s infinite;
    }

    @keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  `
);
