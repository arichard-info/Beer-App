import React from "react";
import styled, { css } from "styled-components";

import Header from "@/components/Scopes/AddDrink/steps/Header";
import Form from "@/components/Scopes/AddDrink/steps/CustomBeer/Form";

const CustomBeer = ({ className, setStep }) => (
  <div className={className}>
    <Header
      title="Bière inconnue"
      onBack={() => setStep((step) => ({ ...step, index: 0 }))}
    />
    <Form />
  </div>
);

export default styled(CustomBeer)(() => css``);
