import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { useCalendar } from "./../../../state/calendar";
import { getFullDate } from "../../../utils/date";

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
    <div className={monthClassNames}>
      {[...offsetArray, ...days].map((day, key) => {
        if (day === null || !day.date)
          return <div key={key} className="offset" />;

        const dayClassNames = classNames("daybox", {
          disabled: day.date.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0),
          today: day.date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
        });
        return (
          <div key={key} className={dayClassNames}>
            <div className="daybox__wrapper">
              <button
                className="daybox__inner"
                title={getFullDate(day.date)}
                onClick={() => dispatch({ type: "SELECT_DAY", value: day })}
              >
                {day.date.getDate()}
              </button>
            </div>
          </div>
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
