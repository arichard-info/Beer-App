import React, { useRef, useEffect, useState } from "react";

const RangeSlider = ({
  onChange = () => {},
  value = 5,
  min = 0,
  max = 10,
  className,
}) => {
  const handleChange = () => {};

  const handleMouseUp = () => {};

  const handleTouchStart = () => {
    window.addEventListener("touchend", handleMouseUp);
  };

  const handleTouchMove = () => {};

  const handleMouseDown = () => {
    window.addEventListener("mouseup", handleMouseUp);
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
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
    >
      <div className="marker" style={{ bottom: "50%" }} />
      <div className="track" />
    </div>
  );
};

export default styled(RangeSlider)(
  () => css`
    width: 100%;
    position: relative;
    .track {
      height: 100%;
      width: 1rem;
      background-color: #e9e9e9;
      border-radius: 2rem;
    }
    .market {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background-color: #ffffff;
      border: 0.1rem solid #000000;
    }
  `
);
