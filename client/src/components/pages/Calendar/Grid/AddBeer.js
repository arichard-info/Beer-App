import React from "react";
import styled, { css } from "styled-components";
import { useTransition, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { getMonthName } from "./../../../../utils/date";
import { useCalendar } from "./../../../../state/calendar";
const AddBeer = ({ className, day }) => {
  const [, dispatch] = useCalendar();

  const handleClose = () => {
    dispatch({ type: "UNSELECT_DAY" });
  };

  const transitions = useTransition(day, day => day !== false, {
    from: { transform: "translate3d(0,100%,0)" },
    enter: { transform: "translate3d(0,0,0)" },
    leave: { transform: "translate3d(0,100%,0)" },
    config: { duration: 300 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className={className} key={key} style={props}>
          <div className="header">
            <p>
              {item.getDate()} {getMonthName(item)}
              <small> {item.getFullYear()}</small>
            </p>
            <button className="close" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <Link className="cta" to="/home/add-beer">
            Ajouter une bière
          </Link>
        </animated.div>
      )
  );
};

export default styled(AddBeer)(
  ({ theme: { colors, fw } }) => css`
    position: sticky;
    z-index: 2;
    bottom: 0;

    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
    background-color: ${colors.white};
    border-radius: 1.4rem 1.4rem 0 0;
    padding: 3rem;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 2rem;
      .close {
        border: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        font-size: 1.8rem;
      }
      p {
        margin: 0;
        display: block;
        font-size: 1.8rem;
        font-weight: ${fw.bold};
        color: ${colors.black};
        small {
          font-size: 1.8rem;
          font-weight: ${fw.semibold};
        }
      }
    }
  `
);
