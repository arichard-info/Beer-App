import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { debounce } from "./../../../utils";
import { useCalendar } from "./../../../state/calendar";
import Month from "./Month";

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const [{ months, today }, dispatch] = useCalendar();

  useEffect(() => {
    const container = scrollContainer.current;
    dispatch({ type: "INIT", value: container });

    const handleScroll = debounce(() => {
      let newIndex = false;
      const scrollTop = window.scrollY;
      const monthsEls = container.childNodes;
      let closestOffset = 100000;
      monthsEls.forEach((el, index) => {
        const offset = el.offsetTop - scrollTop;
        if (offset >= 0 && offset < closestOffset) {
          closestOffset = offset;
          newIndex = index;
        }
      });
      dispatch({ type: "UPDATE_HIGHLIGHT_MONTH", value: newIndex });
    }, 15);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [today, months, dispatch]);
  return (
    <div className={className} ref={scrollContainer}>
      {months.map((month, key) => (
        <Month
          month={month.month}
          year={month.year}
          key={key}
          days={month.days}
        />
      ))}
    </div>
  );
};

export default styled(Calendar)(
  () => css`
    padding: 0 1.5rem;
    position: relative;
  `
);
