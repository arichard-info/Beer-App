import React from "react";
import styled, { css } from "styled-components";

import Header from "@/components/Scopes/AddDrink/steps/Header";
import Recap from "@/components/Scopes/AddDrink/steps/FillBeer/Recap";

const FillBeer = ({ className, form, setStep }) => {
  const handleBack = () => {
    if (form.customBeer) {
      setStep((step) => ({ ...step, index: 1 }));
    } else {
      setStep((step) => ({ ...step, index: 0 }));
    }
  };
  return (
    <div className={className}>
      <Header title="Remplis ta bière !" onBack={handleBack} />
      <div className="wrapper">
        <Recap form={form} />
      </div>
    </div>
  );
};

export default styled(FillBeer)(
  ({ theme: { colors, device } }) => css`
    .wrapper {
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
    }
  `
);
