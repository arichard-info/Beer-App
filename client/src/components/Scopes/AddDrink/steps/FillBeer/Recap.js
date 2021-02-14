import React from "react";
import styled, { css } from "styled-components";
import { getMonthName } from "@/utils/date";
import BeerItem from "@/components/Global/BeerItem";

const Recap = ({
  className,
  form: { date, beer = false, customBeer = false } = {},
  onClick = () => {},
}) => {
  return (
    <div className={className}>
      <span className="date">
        <strong>
          {date.getDate()} {getMonthName(date)}
        </strong>
        &nbsp;{date.getFullYear()}
      </span>
      <BeerItem beer={beer || customBeer} />
      <button type="submit" className="cta" onClick={onClick}>
        Confirmer
      </button>
    </div>
  );
};

export default styled(Recap)(
  ({ theme: { colors } }) => css`
    border-radius: 1.7rem;
    background-color: #ffebbc;
    padding: 2rem;

    .date {
      display: block;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: ${colors.black};
    }
    button {
      margin-top: 1rem;
    }
  `
);
