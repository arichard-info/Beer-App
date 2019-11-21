import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useCalendar } from "./../../state/calendar";
import Month from "./Month";

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const [{ months, today }] = useCalendar();
  const [scrollIndex, setScrollIndex] = useState(null);

  useEffect(() => {
    const index = months.findIndex(el => el.month === today.getMonth());
    const containerEl = scrollContainer.current;
    const currentMonthEl = scrollContainer.current.childNodes[index];
    scrollContainer.current.scroll(
      0,
      currentMonthEl.offsetTop - containerEl.offsetHeight / 2
    );
    setScrollIndex(index);
  }, [today, months]);

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
