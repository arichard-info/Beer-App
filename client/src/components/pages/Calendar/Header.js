import React from "react";
import styled, { css } from "styled-components";
import { useCalendar } from "./../../../state/calendar";
import { getMonthName } from "./../../../utils/date";

const Header = ({ className }) => {
  const [{ highlight }] = useCalendar();
  const date = highlight
    ? {
        month: getMonthName(highlight.month),
        year: highlight.year
      }
    : { month: "", year: "" };

  return (
    <header className={className}>
      <span>
        {date.month} {date.year}
      </span>
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
