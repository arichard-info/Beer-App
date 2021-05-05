import React from "react";
import styled, { css } from "styled-components";
import { renderDate } from "@/utils/date";
import { long as longDate } from "@/utils/date.conf";

const Case = ({ className, day, dayClassNames, handleClick }) => {
  const levels = [0, 250, 500, 750, 1000, 1250, 1500, 2000, 1000000000];
  const dayLevel = day.quantity
    ? levels.findIndex(
        (lvl, key) => day.quantity > lvl && day.quantity <= levels[key + 1]
      ) + 1
    : 0;
  return (
    <div className={`${className} ${dayClassNames} `}>
      <div className="daybox__wrapper">
        <button
          className={`daybox__inner level-${dayLevel}`}
          title={renderDate(day.date, longDate)}
          onClick={handleClick}
        >
          {day.date.getDate()}
        </button>
      </div>
    </div>
  );
};

export default styled(Case)(({ theme: { colors } }) => {
  const generateLevels = () => {
    let styles = "";
    colors.levelShades.forEach((color, key) => {
      styles += `&.level-${key + 1}{
          background-color: ${color};
      }`;
    });
    return css`
      ${styles}
    `;
  };
  return css`
    flex: 14.286%;
    width: 14.286%;
    max-width: 14.286%;
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
        ${generateLevels}
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
  `;
});
