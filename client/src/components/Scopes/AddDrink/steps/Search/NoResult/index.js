import React from "react";
import styled, { css } from "styled-components";
import BeerIcon from "./BeerIcon";

const NoResult = ({ className, onClick }) => {
  return (
    <div className={className}>
      <div className="content">
        <h3>Bière inconnue ?</h3>
        <p>Appuie là dessus pour saisir ses caractéristiques</p>
        <button onClick={onClick} data-nrt="button-custombeer">
          <BeerIcon />
        </button>
      </div>
    </div>
  );
};

export default styled(NoResult)(
  ({ theme: { colors, fw, device } }) => css`
    .content  {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h3 {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1rem;
      margin-top: 4rem;
    }
    p {
      margin: 0;
    }
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        transform: scale(1.05);
      }
    }

    @media ${device.gtMobile} {
      h3 {
        font-size: 1.6rem;
      }
    }
  `
);
