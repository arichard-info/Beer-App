import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { debounce } from "./../../utils";
import { useCalendar } from "./../../state/calendar";
import Month from "./Month";

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const [{ months, today }, dispatch] = useCalendar();

  useEffect(() => {
    //Add listener to update highlight month
    scrollContainer.current.addEventListener(
      "scroll",
      debounce(() => {
        let newIndex = false;
        const middleScroll =
          scrollContainer.current.scrollTop +
          scrollContainer.current.offsetHeight / 2;

        const monthsEls = scrollContainer.current.childNodes;
        monthsEls.forEach((el, index) => {
          const top = el.offsetTop;
          const bottom = el.offsetTop + el.offsetHeight;
          if (top < middleScroll && bottom > middleScroll) {
            newIndex = index;
          }
        });
        dispatch({ type: "UPDATE_HIGHLIGHT_MONTH", value: newIndex });
      }, 66)
    );

    //On first render => Scroll to today's month
    const index = months.findIndex(el => el.month === today.getMonth());
    const wrapperEl = scrollContainer.current;
    const currentEl = scrollContainer.current.childNodes[index];
    const scrollPosition = currentEl.offsetTop - wrapperEl.offsetHeight / 2;
    scrollContainer.current.scroll(0, scrollPosition);
  }, [today, months, dispatch]);

  return (
    <div className={className}>
      <header>
        <button className="prev">Prev</button>
        <span>Test Title</span>
        <button className="next">Next</button>
      </header>
      <div className="scroll-container" ref={scrollContainer}>
        {months.map((month, key) => (
          <Month
            month={month.month}
            year={month.year}
            key={key}
            days={month.days}
          />
        ))}
      </div>
    </div>
  );
};

export default styled(Calendar)(
  () => css`
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    header {
    }
    .scroll-container {
      height: 100vh;
      max-height: 100vh;
      overflow-y: scroll;
      overflow-x: hidden;
      scroll-snap-type: y mandatory;
    }
  `
);
