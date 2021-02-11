import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { classNames } from "@/utils";

const RangeSlider = ({
  onChange = () => {},
  value = 5,
  min = 0,
  max = 10,
  className,
}) => {
  const [dragging, setDragging] = useState(false);
  const trackEl = useRef(null);
  const inputEl = useRef(null);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleChange = (e) => {
    const rect = trackEl.current.getBoundingClientRect();
    const progress = rect.height - (e.clientY - rect.top);
    if (progress > rect.height) value = max;
    else if (progress < 0) value = min;
    else value = Math.round(min + (progress * (max - min)) / rect.height);
    onChange(value);
  };

  const handleMouseUp = () => {
    removeEventListeners();
    setDragging(false);
  };

  const handleTouchStart = (e) => {
    inputEl.current.focus();
    setDragging(true);
    handleChange(e);
    window.addEventListener("touchmove", handleChange);
    window.addEventListener("touchend", handleMouseUp);
  };

  const handleMouseDown = (e) => {
    inputEl.current.focus();
    setDragging(true);
    handleChange(e);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleChange);
  };

  const removeEventListeners = () => {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchend", handleMouseUp);
  };

  useEffect(() => {
    return removeEventListeners;
  }, []);

  return (
    <div className={className}>
      <input
        ref={inputEl}
        className="vh"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
      />
      <div className="track-wrapper">
        <div
          ref={trackEl}
          className={classNames("track", { dragging })}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
        >
          <div
            className="progress"
            style={{ height: `${(100 * value) / (max - min) - min}%` }}
          />
          <div
            className="marker"
            style={{ bottom: `${(100 * value) / (max - min) - min}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default styled(RangeSlider)(
  ({ theme: { colors } }) => css`
    height: 100%;
    .track-wrapper {
      width: auto;
      display: inline-block;
      height: 100%;
      padding: 0.5rem;
    }
    .track {
      height: 100%;
      width: 1.2rem;
      background-color: #e9e9e9;
      border-radius: 2rem;
      position: relative;
      cursor: grab;
      &.dragging {
        cursor: grabbing;
      }
    }
    .marker {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      height: 1.4rem;
      width: 1.4rem;
      border-radius: 50%;
      background-color: #ffffff;
      border: 0.1rem solid #000000;
      transition: height 0.2s ease, width 0.2s ease;
    }
    .progress {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${colors.primary};
      border-radius: 2rem;
    }

    input:focus + .track-wrapper .marker {
      width: 1.8rem;
      height: 1.8rem;
    }

    input:focus-visible + .track-wrapper {
      border: 0.1rem solid #000000;
    }
  `
);
