import React from "react";
import styled, { css } from "styled-components";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons";

const Shortcut = ({ className }) => {
  return (
    <Link className={className} to="/add-drink">
      <FontAwesomeIcon icon={faBeer} />
    </Link>
  );
};

export default styled(Shortcut)(
  ({ theme: { colors, device } }) => css`
    display: none;

    @media screen and (min-width: 1000px) {
      position: sticky;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 2rem;
      right: 0rem;
      margin-left: auto;
      margin-right: -3rem;
      background-color: ${colors.primary};
      border-radius: 100rem;
      font-size: 2.7rem;
      height: 6rem;
      width: 6rem;
      color: ${colors.white};
      z-index: 1;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transition: all 0.2s ease;
      &:hover {
        transform: scale(1.05);
      }
    }
  `
);
