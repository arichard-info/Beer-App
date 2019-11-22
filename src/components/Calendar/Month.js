import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { useCalendar } from "./../../state/calendar";

const Month = ({ className, days, month, year }) => {
  const [{ today, highlight }] = useCalendar();
  const offset = days[0].getDay() - 1;
  const offsetArray = Array(offset >= 0 ? offset : 6).fill(null);

  const monthClassNames = classNames(className, {
    current: highlight && month === highlight.month && year === highlight.year
  });

  return (
    <div className={monthClassNames}>
      {[...offsetArray, ...days].map((day, key) => {
        if (day === null) return <div key={key} className="offset" />;

        const dayClassNames = classNames("daybox", {
          disabled: day.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0),
          today: day.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
        });
        return (
          <div key={key} className={dayClassNames}>
            <div className="daybox__wrapper">
              <button
                className="daybox__inner"
                onClick={() => console.log(day)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default styled(Month)(
  () => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    scroll-snap-align: center;

    transition: padding 0.2s ease;

    &.current {
      padding-left: 0;
      padding-right: 0;
    }

    .offset,
    .daybox {
      flex: 14.286%;
      width: 14.286%;
      max-width: 14.286%;
    }

    .daybox {
      padding: 1%;
      .daybox__wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .daybox__inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: #f6f6f6;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
          outline: none;
          cursor: pointer;
        }
      }
      &.today {
        .daybox__inner {
          border-color: #ffcf40;
          box-shadow: 0px 0px 10px #ffd045;
        }
      }
    }

    &.disabled,
    .disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  `
);
