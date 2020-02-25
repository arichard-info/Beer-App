import React from "react";
import styled, { css } from "styled-components";

const BeerItem = ({ className }) => {
  return (
    <div className={className}>
      <div className="photo" />
      <div className="beer-info" />
    </div>
  );
};

export default styled(BeerItem)(
  () => css`
    display: flex;
    align-items: space-between;
    position: relative;
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
    .photo {
      height: 6rem;
      width: 6rem;
      min-height: 6rem;
      min-width: 6rem;
      max-height: 6rem;
      max-width: 6rem;
      background-color: #f0f0f0;
      border-radius: 1rem;
      border: 0.4rem solid #f0f0f0;
    }
    .beer-info {
      margin-left: 1.5rem;
      background-color: #f0f0f0;
      border-radius: 1rem;
      border: 0.4rem solid #f0f0f0;
      width: 100%;
    }
  `
);
