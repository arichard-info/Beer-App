import React from "react";
import styled, { css } from "styled-components";
import { getMonthName } from "./../../../utils/date";

const AddBeer = ({ className, day }) => {
  return (
    <div className={className}>
      <p>
        {day.getDate()} {getMonthName(day)}
        <small> {day.getFullYear()}</small>
      </p>
      <button className="cta">Ajouter une bière</button>
    </div>
  );
};

export default styled(AddBeer)(
  ({ theme: { colors, fw } }) => css`
    position: sticky;
    bottom: 0;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
    background-color: ${colors.white};
    border-radius: 1.4rem 1.4rem 0 0;
    padding: 3rem;
    p {
      margin-top: 0;
      margin-bottom: 2rem;
      display: block;
      font-size: 1.8rem;
      font-weight: ${fw.bold};
      color: ${colors.black};
      small {
        font-size: 1.8rem;
        font-weight: ${fw.semibold};
      }
    }
  `
);
