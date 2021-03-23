import React from "react";
import styled, { css } from "styled-components";
import PageHeader from "@/components/Global/PageHeader";

import { useCalendar } from "@/state/calendar";
import { getMonthName } from "@/utils/date";

const Header = ({ className }) => {
  const [{ highlight }] = useCalendar();
  const date = highlight
    ? {
        month: getMonthName(highlight.getMonth()),
        year: highlight.getFullYear(),
      }
    : { month: "", year: "" };

  return (
    <PageHeader back={false} title="Mon calendrier" customClass={className}>
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
    </PageHeader>
  );
};

export default styled(Header)(
  ({ theme: { fw, colors, device } }) => css`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
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
    @media ${device.gtMobile} {
      padding-left: 5.5rem;
      padding-right: 4rem;
    }
  `
);
