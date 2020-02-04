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
  ({ theme: { device } }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    @media ${device.gtMobile} {
      padding: 0 0 0 4rem;
    }
  `
);
