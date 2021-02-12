import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { classNames } from "@/utils";
import Graduation from "./Graduation";

const RangeSlider = ({
  onChange = () => {},
  value = 5,
  min = 0,
  max = 10,
  className,
  vertical = false,
  graduations = false,
}) => {
  const [dragging, setDragging] = useState(false);
  const trackEl = useRef(null);
  const inputEl = useRef(null);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleChange = (e) => {
    const rect = trackEl.current.getBoundingClientRect();
    const sizeMax = vertical ? rect.height : rect.width;
    const progress = vertical
      ? sizeMax - (e.clientY - rect.top)
      : sizeMax - (e.clientX - rect.left);
    if (progress > sizeMax) value = max;
    else if (progress < 0) value = min;
    else value = Math.round(min + (progress * (max - min)) / sizeMax);
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

  const progressPercent = (100 * value) / (max - min) - min;

  return (
    <div className={classNames(className, { vertical })}>
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
            style={{
              [vertical ? height : width]: `${progressPercent}%`,
            }}
          />
          <div
            className="marker"
            style={{
              [vertical ? bottom : left]: `${progressPercent}%`,
            }}
          />
        </div>
      </div>
      {!!(graduations && graduations.length) && (
        <Graduation graduations={graduations} vertical={vertical} />
      )}
    </div>
  );
};

export default styled(RangeSlider)(
  ({ theme: { colors } }) => css`
    display: flex;
    .track-wrapper {
      width: 100%;
      height: auto;
      display: inline-block;
      padding: 0.5rem;
    }
    .track {
      width: 100%;
      height: 1.5rem;
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
      top: 50%;
      transform: translate(50%, -50%);
      height: 1.6rem;
      width: 1.6rem;
      border-radius: 50%;
      background-color: #ffffff;
      border: 0.1rem solid #000000;
      transition: height 0.2s ease, width 0.2s ease;
    }
    .progress {
      height: 100%;
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

    &.vertical {
      height: 100%;
      .track-wrapper {
        height: 100%;
        width: auto;
      }
      .track {
        height: 100%;
        width: 1.5rem;
      }
      .marker {
        left: 0;
        transform: translate(-50%, 50%);
        top: auto;
      }
      .progress {
        width: 100%;
        height: auto;
      }
    }
  `
);
