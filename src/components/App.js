import React from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Calendar from "./Calendar";

const App = ({ className }) => {
  return (
    <>
      <GlobalStyle />
      <div className={className}>
        <Calendar />
      </div>
    </>
  );
};

export default styled(App)(() => css``);
