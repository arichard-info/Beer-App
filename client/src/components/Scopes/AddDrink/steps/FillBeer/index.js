import React, { useState } from "react";
import styled, { css } from "styled-components";

import BeerIcon from "@/components/Global/BeerIcon";
import Header from "@/components/Scopes/AddDrink/steps/Header";
import Recap from "@/components/Scopes/AddDrink/steps/FillBeer/Recap";
import RangeSlider from "@/components/Global/RangeSlider";

const FillBeer = ({ className, form, setStep }) => {
  const [quantity, setQuantity] = useState(250);

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
        <section className="glass-wrapper">
          <div className="glass">
            <BeerIcon fill={quantity / 1000} />
          </div>
          <div className="range">
            <RangeSlider
              value={quantity}
              min={0}
              max={1000}
              onChange={setQuantity}
            />
          </div>
        </section>
        <section>
          <Recap form={form} />
        </section>
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
    }

    .glass-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
    }

    .glass {
      width: 60vw;
      padding-left: 3rem;
      padding-right: 3rem;
      padding-bottom: 1rem;
      position: relative;
      z-index: 0;
      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        height: 5rem;
        background: #e9e9e9;
        border-radius: 50%;
        z-index: -1;
      }
    }
    .beer-icon {
      width: 100%;
      height: auto;
    }

    @media ${device.gtMobileSm} {
      .glass {
        max-width: 30rem;
      }
    }

    @media ${device.gtMobile} {
      .wrapper {
        max-width: none;
        margin: 0;
        padding-left: 4rem;
        padding-right: 0;
        padding-right: 1rem;
        margin-right: -1rem;
      }
      .glass {
        order: 2;
        max-width: 30rem;
      }
      .range {
        order: 1;
      }
    }
  `
);
