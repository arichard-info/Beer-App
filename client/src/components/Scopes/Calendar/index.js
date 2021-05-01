import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { getUserDrinks } from "@/utils/api/drinks";

import Shortcut from "./Shortcut";
import Header from "./Header";
import AddBeer from "./AddBeer";
import Month from "./Month";

const Calendar = ({ className }) => {
  const scrollContainer = useRef();
  const indicatorEl = useRef();

  const dispatch = useDispatch();
  const months = useSelector(({ calendar } = {}) => calendar.months);
  const selected = useSelector(({ calendar } = {}) => calendar.selected);
  const highlight = useSelector(({ calendar = {} }) => calendar.highlight);

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
        dispatch({ type: "calendar/monthHighlight", payload: index });
      }
    };

    const observer = new IntersectionObserver(callback, options);
    [...months].forEach((el) => observer.observe(el));
  }, [dispatch]);

  useEffect(() => {
    if (highlight && highlight.index !== undefined) {
      const months =
        scrollContainer.current && scrollContainer.current.children;
      const el = months && months[highlight.index];
      const boundings = el.getBoundingClientRect();
      const height = boundings && boundings.height;
      const top = el.offsetTop;
      indicatorEl.current.style.top = `${top}px`;
      indicatorEl.current.style.height = `${height}px`;
    }
  }, [highlight]);

  useEffect(() => {
    async function fillDrinks() {
      const drinks = await getUserDrinks();
      dispatch({ type: "calendar/fill", payload: drinks });
    }
    if (
      highlight &&
      highlight.index !== undefined &&
      scrollContainer &&
      scrollContainer.current
    ) {
      const currentEl = scrollContainer.current.childNodes[highlight.index];
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

export default styled(Calendar)(
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
