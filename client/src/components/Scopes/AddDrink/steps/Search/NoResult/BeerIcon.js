import React from "react";
import styled, { css } from "styled-components";
import BeerIcon from "@/components/Global/BeerIcon";

const Icon = ({ className }) => (
  <div className={className}>
    <BeerIcon />
  </div>
);

export default styled(Icon)(
  ({ theme: { colors } }) => css`
    height: 13rem;
    min-height: 13rem;
    width: 13rem;
    min-width: 13rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 13rem;
    background-color: ${colors.amber};
    box-shadow: 0px 0px 10px ${colors.amber};

    svg {
      margin: auto;
      width: 60%;
      height: 60%;
    }
  `
);
