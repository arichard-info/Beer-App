import React from "react";
import styled, { css } from "styled-components";
import { useCalendar } from "./../../state/calendar";
import { getMonthName } from "./../../utils/date";

const Header = ({ className }) => {
  const [{ highlight }, dispatch] = useCalendar();
  const date = highlight
    ? {
        month: getMonthName(highlight.month),
        year: highlight.year
      }
    : { month: "", year: "" };

  function handlePreviousClick() {
    dispatch({ type: "PREVIOUS_MONTH" });
  }
  function handleNextClick() {
    dispatch({ type: "NEXT_MONTH" });
  }

  return (
    <header className={className}>
      <button onClick={handlePreviousClick}>Prev</button>
      <span>
        {date.month} {date.year}
      </span>
      <button onClick={handleNextClick}>Next</button>
    </header>
  );
};

export default styled(Header)(
  () => css`
    padding: 2rem 1rem;
    display: flex;
    justify-content: start;
    span {
      padding: 0 1rem;
    }
  `
);
