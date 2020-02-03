import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { useCalendar } from "./../../../state/calendar";
import { getFullDate } from "../../../utils/date";

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
                title={getFullDate(day)}
                onClick={() => console.log(day)}
              >
                {day.getDate()}
              </button>
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
    padding: 1rem 5rem;
    scroll-snap-align: center;
    transition: padding 0.2s ease;

    &.current {
      padding: 0 2.5rem;
    }

    .offset,
    .daybox {
      flex: 14.286%;
      width: 14.286%;
      max-width: 14.286%;
    }

    .daybox {
      padding: 1%;
      transition: padding 0.1s ease;
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
          background-color: #f0f0f0;
          border: none;
          border-radius: 10px;
          outline: none;
          cursor: pointer;
          color: transparent;
          transition: color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 0 transparent;
        }
      }
      &.today {
        .daybox__inner {
          border: 0.1rem solid #ffcf40;
          box-shadow: 0px 0px 10px #ffd045;
        }
      }
      &:hover {
        padding: 0;

        .daybox__inner {
          color: grey;
          box-shadow: 0 0 0 0.2rem grey;
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
