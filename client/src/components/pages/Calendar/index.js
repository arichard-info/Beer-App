import React from "react";
import styled, { css } from "styled-components";

import { CalendarProvider, useCalendar } from "./../../../state/calendar";

import Header from "./Header";
import Calendar from "./Calendar";
import AddBeer from "./AddBeer";

const CalendarPage = ({ className }) => {
  const [{ selected }] = useCalendar();

  return (
    <div className={className}>
      <Header />
      <Calendar />
      <AddBeer day={selected} />
    </div>
  );
};

const StyledCalendarPage = styled(CalendarPage)(
  ({ theme: { device } }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 0;
    @media ${device.gtMobile} {
      padding: 0 0 0 4rem;
    }
  `
);

export default () => (
  <CalendarProvider>
    <StyledCalendarPage />
  </CalendarProvider>
);
