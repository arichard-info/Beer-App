import React from "react";
import styled, { css } from "styled-components";

import Header from "@/components/pages/AddDrink/steps/Header";

const CustomBeer = ({ className }) => (
  <div className={className}>
    <Header title="Bière inconnue" />
  </div>
);

export default styled(CustomBeer)(() => css``);
