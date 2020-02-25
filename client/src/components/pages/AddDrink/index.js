import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import Step from "./steps";

const AddDrink = ({ className }) => {
  const [step, setStep] = useState(0);
  const { state = {} } = useLocation();
  const selectedDay = state.selectedDay || new Date();
  return (
    <div className={className}>
      <Step step={step} />
    </div>
  );
};

export default styled(AddDrink)(
  ({ theme: { device } }) => css`
    @media ${device.gtMobile} {
      padding: 3rem 0 0 4rem;
    }
  `
);
