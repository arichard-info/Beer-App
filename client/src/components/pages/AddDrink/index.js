import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";

import Search from "./steps/Search";
import CustomBeer from "./steps/CustomBeer";

const SwitchSteps = {
  0: (rest) => <Search {...rest} />,
  1: (rest) => <CustomBeer {...rest} />,
};

const AddDrink = ({ className }) => {
  const [step, setStep] = useState({ index: 0 });
  const { state = {} } = useLocation();
  const selectedDay = state.selectedDay || new Date();
  return (
    <div className={className}>
      {SwitchSteps[step.index]({ step, setStep })}
    </div>
  );
};

export default styled(AddDrink)(
  ({ theme: { device } }) => css`
    @media ${device.gtMobile} {
      padding: 0 0 0 4rem;
    }
  `
);
