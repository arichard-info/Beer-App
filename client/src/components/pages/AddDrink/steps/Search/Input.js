import React from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faSearch } from "@fortawesome/free-solid-svg-icons";

const Input = ({ className }) => (
  <div className={className}>
    <span className="search">
      <FontAwesomeIcon icon={faSearch} />
    </span>
    <input type="text" placeholder="Brasserie, couleur ou type..." />

    <button className="filters">
      <FontAwesomeIcon icon={faSlidersH} />
    </button>
  </div>
);

export default styled(Input)(
  ({ theme: { colors } }) => css`
    position: relative;
    input {
      width: 100%;
      font-size: 1.5rem;
      padding: 1rem 4.5rem;
      border-radius: 50rem;
      background-color: ${colors.grey1};
      border: 0.1rem solid transparent;
      transition: all 0.2s ease;
      &:focus {
        border-color: ${colors.primary};
        box-shadow: 0 0 0.3rem 0 rgba(255, 191, 0, 1);
        outline: none;
        background-color: ${colors.white};
      }
    }
    button,
    span {
      position: absolute;
      cursor: pointer;
      font-size: 1.4rem;
      vertical-align: middle;
      line-height: 4rem;
      height: 100%;
      top: 0;
      background-color: transparent;
      width: 4rem;
      &:first-child {
        padding: 0 0.5rem 0 1.5rem;
        left: 0.1rem;
      }
      &:last-child {
        padding: 0 1.5rem 0 1rem;
        border-left: 0.1rem solid ${colors.grey2};
        right: 0.1rem;
      }
    }
    span {
      pointer-events: none;
    }
    button,
    span,
    input {
      border: none;
      outline: none;
      height: 4rem;
    }
  `
);
