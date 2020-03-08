import React from "react";
import styled, { css } from "styled-components";
import BeerItem from "./../../../../BeerItem";

const Input = ({ className, beers }) => (
  <div className={className}>
    {beers.map((beer, key) => (
      <BeerItem beer={beer} key={key} />
    ))}
  </div>
);

export default styled(Input)(
  () =>
    css`
      margin-top: 2rem;
      margin-bottom: 2rem;
    `
);
