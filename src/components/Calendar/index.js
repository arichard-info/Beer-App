import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { debounce } from "./../../utils";
import { useCalendar } from "./../../state/calendar";
import Month from "./Month";
import Header from "./Header";

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const [{ months, today }, dispatch] = useCalendar();

  useEffect(() => {
    //Add listener to update highlight month
    scrollContainer.current.addEventListener(
      "scroll",
      debounce(() => {
        let newIndex = false;
        const scrollTop = scrollContainer.current.scrollTop;
        const monthsEls = scrollContainer.current.childNodes;
        let closestOffset = 100000;
        monthsEls.forEach((el, index) => {
          const offset = el.offsetTop - scrollTop;
          if (offset >= 0 && offset < closestOffset) {
            closestOffset = offset;
            newIndex = index;
          }
        });
        dispatch({ type: "UPDATE_HIGHLIGHT_MONTH", value: newIndex });
      }, 10)
    );

    dispatch({ type: "INIT", value: scrollContainer.current });
  }, [today, months, dispatch]);

  return (
    <div className={className}>
      <Header />
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
      scroll-behavior: smooth;
      position: relative;
      /*scroll-snap-type: y proximity;*/
    }
  `
);
