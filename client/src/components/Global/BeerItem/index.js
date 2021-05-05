import React from "react";
import styled, { css } from "styled-components";
import { classNames } from "@/utils";

const BeerItem = ({
  customClass = "",
  className,
  beer = {},
  quantity = false,
  onClick = null,
  dataNrt = "beer-item",
}) => {
  const clickable = typeof onClick === "function";
  return (
    <div
      className={classNames(className, customClass, { clickable })}
      onClick={onClick}
      data-nrt={dataNrt}
    >
      <div
        className="photo"
        style={{ backgroundImage: `url(${beer.photo})` }}
      />
      <div className="beer-info">
        <span className="name" data-nrt={`${dataNrt}-name`}>
          {beer.name}
        </span>
        {(beer.family || beer.tags) && (
          <span className="tags">
            {beer.family && beer.family.name && (
              <>
                <strong data-nrt={`${dataNrt}-family`}>
                  {beer.family.name}
                </strong>
                {!!(beer.tags && beer.tags.length) && ` -`}
              </>
            )}
            {!!(beer.tags && beer.tags.length) && beer.tags.join(" - ")}
          </span>
        )}
      </div>

      {!!quantity && (
        <span className="quantity" data-nrt={`${dataNrt}-quantity`}>
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
      strong {
        margin-right: 0.5rem;
      }
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
