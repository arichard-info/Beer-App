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
            <NavLink
              activeClassName="active"
              to="/home"
              data-nrt="nav-main-grid"
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Grille</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              to="/profile"
              data-nrt="nav-main-stats"
            >
              <FontAwesomeIcon icon={faChartArea} />
              <span>Stats</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              to="/settings"
              data-nrt="nav-main-settings"
            >
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
  ({ theme: { colors, fw, device } }) => css`
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-around;
      li {
        a {
          font-weight: ${fw.semibold};
          padding: 0.75rem 1.4rem;
          border-radius: 50rem;
          color: ${colors.grey9};
          display: flex;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
          font-size: 1.6rem;
          span {
            line-height: 1;
            font-size: 0.8em;
            display: none;
            transition: max-width 0.5s ease;
            padding-left: 1rem;
          }
          &.active {
            background-color: ${colors.pastelAmber};
            span {
              display: block;
            }
          }
        }
      }
    }

    @media ${device.gtMobileSm} {
      ul li a span {
        display: block;
      }
    }

    @media ${device.gtMobile} {
      ul {
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        padding: 2rem;
        li {
          margin-bottom: 1rem;
          a {
            font-size: 1.9rem;
            span {
              display: block;
            }
          }
        }
      }
    }
  `
);
