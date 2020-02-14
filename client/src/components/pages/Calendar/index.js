import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { debounce } from "./../../../utils";
import { useCalendar, CalendarProvider } from "./../../../state/calendar";

import Shortcut from "./Shortcut";
import Header from "./Header";
import AddBeer from "./AddBeer";
import Month from "./Month";

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const [{ months, selected }, dispatch] = useCalendar();

  useEffect(() => {
    dispatch({ type: "INIT", value: scrollContainer.current });
    const handleScroll = debounce(() => {
      let newIndex = false;
      const scrollTop = window.scrollY;
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
    }, 15);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

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
      {!selected && <Shortcut />}
      <AddBeer day={selected} />
    </div>
  );
};

const StyledCalendar = styled(Calendar)(
  ({ theme: { device, colors } }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 0;
    @media ${device.gtMobile} {
      padding: 0 0 0 4rem;
    }
    .scroll-container {
      padding: 0 1.5rem;
      position: relative;
    }
  `
);

export default () => {
  return (
    <CalendarProvider>
      <StyledCalendar />
    </CalendarProvider>
  );
};
