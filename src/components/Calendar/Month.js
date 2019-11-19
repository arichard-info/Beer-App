import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { useCalendar } from "./../../state/calendar";

const Month = ({ className, days, id }) => {
  const [{ current }] = useCalendar();
  const offset = days[0].getDay() - 1;
  const offsetArray = Array(offset >= 0 ? offset : 6).fill(null);

  const monthClassNames = classNames(className, {
    current: current.getMonth() === id
  });
  return (
    <div className={monthClassNames}>
      {[...offsetArray, ...days].map((day, key) => {
        if (day === null) return <div key={key} className="offset" />;

        const dayClassNames = classNames("daybox", {
          disabled: day.setHours(0, 0, 0, 0) > current.setHours(0, 0, 0, 0),
          current: day.setHours(0, 0, 0, 0) === current.setHours(0, 0, 0, 0)
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
          background-color: grey;
          border-radius: 10px;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }
      &.current {
        .daybox__inner {
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
