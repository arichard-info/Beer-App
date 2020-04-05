import React from "react";
import styled, { css } from "styled-components";

import Header from "@/components/pages/AddDrink/steps/Header";

const FillBeer = ({ className }) => {
  return (
    <div className={className}>
      <Header title="Remplis ta bière !" />
    </div>
  );
};

export default styled(FillBeer)(() => css``);
