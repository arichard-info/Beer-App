import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { CalendarProvider } from "./../state/calendar";
import GlobalStyle from "./GlobalStyle";
import Calendar from "./Calendar";

const App = ({ className }) => {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      res.json().then(res => {
        console.log("--- RESPONSE ---");
        console.log(res);
      });
    }

    fetchData();
  });

  console.log("--- CLIENT SIDE --- ");
  console.log(process.env);
  return (
    <>
      <GlobalStyle />
      <CalendarProvider>
        <div className={className}>
          <div className="calendar-wrapper">
            <Calendar />
          </div>
        </div>
      </CalendarProvider>
    </>
  );
};

export default styled(App)(
  () => css`
    .calendar-wrapper {
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
  `
);
