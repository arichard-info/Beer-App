import React, { useState } from "react";
import styled, { css } from "styled-components";

import BeerIcon from "@/components/Global/BeerIcon";
import Header from "@/components/Scopes/AddDrink/steps/Header";
import Recap from "@/components/Scopes/AddDrink/steps/FillBeer/Recap";
import RangeSlider from "@/components/Global/RangeSlider";

const FillBeer = ({ className, form, setForm, setStep, registerDrink }) => {
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (form.customBeer) {
      setStep((step) => ({ ...step, index: 1 }));
    } else {
      setStep((step) => ({ ...step, index: 0 }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await registerDrink();
    setLoading(false);
  };

  return (
    <div className={className}>
      <Header title="Remplis ta bière !" onBack={handleBack} />
      <div className="wrapper">
        <section className="glass-wrapper">
          <div className="glass">
            <span className="quantity">
              {Math.round(form.quantity / 10)}
              <small>cl</small>
            </span>
            <BeerIcon fill={form.quantity / 1000} />
          </div>
          <div className="range">
            <RangeSlider
              vertical
              value={form.quantity}
              min={0}
              max={1000}
              onChange={(quantity) =>
                setForm((form) => ({ ...form, quantity }))
              }
              graduations={["1L", "75cl", "50cl", "25cl", "0cl"]}
            />
          </div>
        </section>
        <section className="recap">
          <Recap form={form} onClick={handleSubmit} />
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
      margin-top: 2rem;
    }

    .glass-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5rem;
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

    .quantity {
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-block;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      font-weight: 700;
      color: ${colors.grey7};
      small {
        font-size: 3.2rem;
      }
    }

    .range {
      display: flex;
    }

    .beer-icon {
      width: 100%;
      height: auto;
    }

    .recap {
      padding-bottom: 5rem;
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
        margin-top: 3rem;
      }
      .glass {
        order: 2;
        max-width: 30rem;
        margin-right: 8rem;
      }
      .range {
        order: 1;
      }

      .glass-wrapper {
        margin-bottom: 7rem;
      }
    }
  `
);
