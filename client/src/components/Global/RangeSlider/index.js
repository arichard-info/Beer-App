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

  const handleChange = () => {
    console.log("change");
  };

  const handleMouseUp = () => {
    console.log("up");
    removeEventListeners();
    setDragging(false);
  };

  const handleTouchStart = () => {
    window.addEventListener("touchend", handleMouseUp);
  };

  const handleTouchMove = () => {};

  const handleMouseDown = () => {
    setDragging(true);
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
  });
  return (
    <div className={className}>
      <div
        className={classNames("track", { dragging })}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        // onMouseOver={handleMouseOver}
      >
        <div
          className="progress"
          style={{ height: `${(100 * value) / (max - min)}%` }}
        />
        <div
          className="marker"
          style={{ bottom: `${(100 * value) / (max - min)}%` }}
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
      cursor: pointer;
      &.dragging {
        cursor: move;
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
