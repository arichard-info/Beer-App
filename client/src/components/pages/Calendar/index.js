import React from "react";
import styled, { css } from "styled-components";

import { CalendarProvider } from "./../../../state/calendar";

import Header from "./Header";
import Calendar from "./Calendar";

const CalendarPage = ({ className }) => {
  return (
    <div className={className}>
      <CalendarProvider>
        <Header />
        <Calendar />
      </CalendarProvider>
    </div>
  );
};

export default styled(CalendarPage)(
  () => css`
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
  `
);
