import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { getMonthName } from "./../../../utils/date";
import { useCalendar } from "./../../../state/calendar";

const AddBeer = ({ className, day }) => {
  const [, dispatch] = useCalendar();

  const handleClose = () => {
    dispatch({ type: "UNSELECT_DAY" });
  };

  return (
    <div className={className}>
      <div className="header">
        <p>
          {day.getDate()} {getMonthName(day)}
          <small> {day.getFullYear()}</small>
        </p>
        <button className="close" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <button className="cta">Ajouter une bière</button>
    </div>
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
