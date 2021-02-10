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

  const handleChange = (e) => {
    const rect = trackEl.current.getBoundingClientRect();
    const progress = rect.height - (e.clientY - rect.top); //y position within the element.
    if (progress > rect.height) value = max;
    else if (progress < 0) value = min;
    else value = Math.round(min + (progress * (max - min)) / rect.height);
    onChange(value);
  };

  const handleMouseUp = () => {
    removeEventListeners();
    setDragging(false);
  };

  const handleTouchStart = () => {
    window.addEventListener("touchend", handleMouseUp);
  };

  const handleTouchMove = () => {};

  const handleMouseDown = (e) => {
    setDragging(true);
    handleChange(e);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleChange);
  };

  const handleMouseOver = () => {};

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
      <div
        ref={trackEl}
        className={classNames("track", { dragging })}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
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
  );
};

export default styled(RangeSlider)(
  ({ theme: { colors } }) => css`
    height: 100%;
    .track {
      height: 100%;
      width: 1rem;
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
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 50%;
      background-color: #ffffff;
      border: 0.1rem solid #000000;
    }
    .progress {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${colors.primary};
      border-radius: 2rem;
    }
  `
);
