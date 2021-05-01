import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { getUserDrinks } from "@/utils/api/drinks";
import { useCalendar, CalendarProvider } from "@/state/calendar";

import Shortcut from "./Shortcut";
import Header from "./Header";
import AddBeer from "./AddBeer";
import Month from "./Month";

function getMonthElIndex(months, day) {
  let month = false;
  let year = false;
  if (typeof day.getMonth === "function") {
    month = day.getMonth();
    year = day.getFullYear();
  } else return false;
  const index = months.findIndex(
    (days) =>
      -1 !==
      days.findIndex(
        (day) =>
          day.date.getMonth() === month && day.date.getFullYear() === year
      )
  );

  return index;
}

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const indicatorEl = useRef();
  const [{ months, selected, today }, dispatch] = useCalendar();

  useEffect(() => {
    const months = scrollContainer.current && scrollContainer.current.children;

    const options = {
      root: document.getElementById("body"),
      rootMargin: "-150px 0px 0px",
      threshold: 1,
    };

    const callback = (entries) => {
      const entry = (entries && entries[0]) || {};
      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        const index = months && [...months].indexOf(entry.target);
        const height = entry.boundingClientRect.height;
        const top = entry.target.offsetTop;
        indicatorEl.current.style.top = `${top}px`;
        indicatorEl.current.style.height = `${height}px`;
        dispatch({ type: "UPDATE_HIGHLIGHT_MONTH", value: index });
      }
    };

    const observer = new IntersectionObserver(callback, options);
    [...months].forEach((el) => observer.observe(el));
  }, [dispatch]);

  useEffect(() => {
    async function fillDrinks() {
      const drinks = await getUserDrinks();
      dispatch({ type: "FILL_DRINKS", value: drinks });
    }
    if (months && today && scrollContainer && scrollContainer.current) {
      const index = getMonthElIndex(months, today);
      const currentEl = scrollContainer.current.childNodes[index];
      const scrollPosition = currentEl.offsetTop;
      window.scroll(0, scrollPosition);
    }
    fillDrinks();
  }, [dispatch]);

  return (
    <div className={className}>
      <Header />
      <div className="scroll-wrapper">
        <div className="indicator" ref={indicatorEl} />
        <div className="scroll-container" ref={scrollContainer}>
          {months.map((month, key) => (
            <Month key={key} days={month} />
          ))}
        </div>
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

    .scroll-wrapper {
      position: relative;
    }
    .indicator {
      position: absolute;
      left: -3.5rem;
      top: 0;
      width: 0.5rem;
      border-radius: 10px;
      background-color: ${colors.primary};
      /* border: 2px solid ${colors.primary}; */
      transition: top 0.4s ease, height 0.4s ease;
    }
    .scroll-container {
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
