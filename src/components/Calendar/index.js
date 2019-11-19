import React, { useState } from "react";
import styled, { css } from "styled-components";
import { getDaysInMonth } from "./../../utils/date";

const Calendar = ({ className }) => {
  const todayDate = new Date();
  const [displayMonth, setDisplayMonth] = useState(todayDate.getMonth());
  const [displayYear, setDisplayYear] = useState(todayDate.getFullYear());
  //let currentMonth = getDaysInMonth(displayMonth, displayYear);

  let months = [];
  for (let y = 2000; y <= todayDate.getFullYear(); y++)
    for (let m = 0; m < 12; m++) months.push({ days: getDaysInMonth(m, y) });

  console.log(months);

  return (
    <div className={className}>
      {months.map((month, key) => (
        <div className="month" key={key}>
          {month.days.map((day, key) => {
            console.log("COUCOU");
            return (
              <div className="daybox" key={key}>
                <div className="daybox__wrapper">
                  <div className="daybox__inner" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default styled(Calendar)(
  () => css`
    .month {
      display: flex;
      flex-wrap: wrap;
      .daybox {
        flex: 14.286%;
        width: 14.286%;
        max-width: 14.286%;
        padding: 0.5vw;
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
          }
        }
        &.daybox__offset {
          .daybox-inner {
            background-color: tomato;
          }
        }
      }
    }
  `
);
