import React from "react";
import styled, { css } from "styled-components";

import Type from "./fields/Type";
import Name from "./fields/Name";
import AlcoholLevel from "./fields/AlcoholLevel";
import SubmitCave from "./fields/SubmitCave";

const Form = ({ className }) => {
  return (
    <form className={className}>
      <Type />
      <AlcoholLevel />
      <Name />
      <SubmitCave />
      <button type="submit">Suivant</button>
    </form>
  );
};

export default styled(Form)(
  ({ theme: { colors, device } }) => css`
    max-width: 50rem;
    margin: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: ${colors.white};

    @media ${device.gtMobile} {
      max-width: none;
      margin: 0;
      padding-left: 4rem;
      padding-right: 0;
      padding-right: 1rem;
      margin-right: -1rem;
    }
  `
);
