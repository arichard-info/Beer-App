import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";

import { useCalendar } from "@/state/calendar";
import Case from "./Case";

const Month = ({ className, days }) => {
  const [{ today, highlight }, dispatch] = useCalendar();
  const offset =
    days && days[0] && days[0].date ? days[0].date.getDay() - 1 : 0;
  const offsetArray = Array(offset >= 0 ? offset : 6).fill(null);

  const monthClassNames = classNames(className, {
    current:
      highlight &&
      days[0].date.getMonth() === highlight.getMonth() &&
      days[0].date.getFullYear() === highlight.getFullYear()
  });

  return (
    <div className={monthClassNames} data-nrt="month-cases">
      {[...offsetArray, ...days].map((day, key) => {
        if (day === null || !day.date)
          return <div key={key} className="offset" />;

        const dayClassNames = classNames("daybox", {
          disabled: day.date.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0),
          today: day.date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
        });

        return (
          <Case
            key={key}
            day={day}
            dayClassNames={dayClassNames}
            handleClick={() => dispatch({ type: "SELECT_DAY", value: day })}
          />
        );
      })}
    </div>
  );
};

export default styled(Month)(
  ({ theme: { device } }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 1rem 2rem;
    scroll-snap-align: center;
    transition: padding 0.4s ease;

    &.current {
      padding: 0;
    }

    .offset {
      flex: 14.286%;
      width: 14.286%;
      max-width: 14.286%;
    }

    &.disabled,
    .disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    @media ${device.gtMobileSm} {
      max-width: 50rem;
      margin: auto;
    }

    @media ${device.gtMobile} {
      max-width: none;
      padding: 1rem 2.5rem;
      &.current {
        padding: 0;
      }
    }
  `
);
