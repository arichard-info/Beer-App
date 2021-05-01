import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "@/utils";

import Case from "./Case";

const Month = ({ className, days }) => {
  const dispatch = useDispatch();
  const today = useSelector(({ calendar = {} } = {}) => calendar.today);
  const highlight = useSelector(({ calendar = {} } = {}) => calendar.highlight);
  const offset =
    days && days[0] && days[0].date ? days[0].date.getDay() - 1 : 0;
  const offsetArray = Array(offset >= 0 ? offset : 6).fill(null);

  const monthClassNames = classNames(className, "month-group", {
    current:
      highlight &&
      highlight.date &&
      days[0].date.getMonth() === highlight.date.getMonth() &&
      days[0].date.getFullYear() === highlight.date.getFullYear(),
  });

  return (
    <div className={monthClassNames} data-nrt="month-cases">
      {[...offsetArray, ...days].map((day, key) => {
        if (day === null || !day.date)
          return <div key={key} className="offset" />;

        const dayClassNames = classNames("daybox", {
          disabled: day.date.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0),
          today: day.date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0),
        });

        return (
          <Case
            key={key}
            day={day}
            dayClassNames={dayClassNames}
            handleClick={() =>
              dispatch({ type: "calendar/selectDay", payload: day })
            }
          />
        );
      })}
    </div>
  );
};

export default styled(Month)(
  ({ theme: { device, colors } }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 1rem;
    scroll-snap-align: center;
    border: 0.3rem solid transparent;
    border-radius: 10px;

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
      padding: 1rem;
    }
  `
);
