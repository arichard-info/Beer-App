import React from "react";
import styled, { css } from "styled-components";

import { useCalendar } from "@/state/calendar";
import { getMonthName } from "@/utils/date";

const Header = ({ className }) => {
  const [{ highlight }] = useCalendar();
  const date = highlight
    ? {
        month: getMonthName(highlight.getMonth()),
        year: highlight.getFullYear()
      }
    : { month: "", year: "" };

  return (
    <header className={className}>
      <h1>Mon calendrier</h1>
      <span className="month">
        {date.month} <small>{date.year}</small>
      </span>
      <ul>
        <li>lun</li>
        <li>mar</li>
        <li>mer</li>
        <li>jeu</li>
        <li>ven</li>
        <li>sam</li>
        <li>dim</li>
      </ul>
    </header>
  );
};

export default styled(Header)(
  ({ theme: { fw, colors, device } }) => css`
    position: sticky;
    top: 0;
    padding: 1.5rem;
    z-index: 1;
    background-color: ${colors.white};
    h1 {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
    .month {
      margin-bottom: 1.5rem;
      display: block;
      font-size: 1.8rem;
      font-weight: ${fw.bold};
      color: ${colors.black};
      small {
        font-size: 1.8rem;
        font-weight: ${fw.semibold};
      }
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      margin: 0;
      li {
        flex: 14.28%;
        width: 14.28%;
        max-width: 14.28%;
        font-style: italic;
        font-size: 1.4rem;
      }
    }

    @media ${device.gtMobileSm} {
      max-width: 50rem;
      width: 50rem;
      margin: auto;
    }

    @media ${device.gtMobile} {
      max-width: none;
      width: 100%;
      padding: 3rem 1.5rem 2rem;
      h1 {
        margin-bottom: 3rem;
      }
    }
  `
);
