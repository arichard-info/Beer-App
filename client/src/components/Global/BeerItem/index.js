import React from "react";
import styled, { css } from "styled-components";

const BeerItem = ({
  customClass,
  className,
  beer = {},
  quantity = false,
  onClick = () => {},
}) => {
  const clickable = typeof onClick === "function";
  return (
    <div
      className={`${className}${clickable ? " clickable" : ""} ${customClass}`}
      onClick={onClick}
    >
      <div
        className="photo"
        style={{ backgroundImage: `url(${beer.photo})` }}
      />
      <div className="beer-info">
        <span className="name">{beer.name}</span>
        {!!(beer.tags && beer.tags.length) && (
          <p className="tags">{beer.tags.join(" - ")}</p>
        )}
      </div>

      {quantity && (
        <span className="quantity">
          {quantity}
          <small>ml</small>
        </span>
      )}
    </div>
  );
};

export default styled(BeerItem)(
  ({ theme: { fw, colors } }) => css`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: transparent;
    transition: background-color 0.2s ease;
    .photo {
      height: 6rem;
      width: 6rem;
      max-height: 6rem;
      max-width: 6rem;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #f0f0f0;
      border-radius: 1rem;
      border: 0.4rem solid #f0f0f0;
      border: 0.2rem solid ${colors.white};
    }
    .beer-info {
      display: flex;
      flex-direction: column;
      margin-left: 1.5rem;
    }
    .name {
      font-weight: ${fw.bold};
      color: ${colors.black};
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    .tags {
      margin: 0;
    }
    .quantity {
      margin-left: auto;
      display: flex;
      align-items: center;
      font-weight: ${fw.semibold};
      color: #ed7a10;
    }
    &.clickable {
      cursor: pointer;
      &:hover {
        background-color: ${colors.pastelAmber};
      }
    }
  `
);
