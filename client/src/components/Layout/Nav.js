import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ className }) => {
  return (
    <div className={className}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/home">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Grille</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/profile">
              <FontAwesomeIcon icon={faChartArea} />
              <span>Stats</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/settings">
              <FontAwesomeIcon icon={faUser} />
              <span>Réglages</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default styled(Nav)(
  () => css`
    @keyframes deactivate {
      0% {
        width: auto;
        max-width: 10rem;
      }
      100% {
        width: 0;
        max-width: 0;
      }
    }

    @keyframes activate {
      0% {
        width: 0;
        max-width: 0;
      }
      100% {
        width: auto;
        max-width: 10rem;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-around;
      li {
        a {
          display: flex;
          span {
            display: none;
          }
          &.active {
            span {
              display: block;
              padding-left: 1rem;
            }
          }
        }
      }
    }
  `
);
