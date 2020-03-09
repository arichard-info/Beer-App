import React from "react";
import styled, { css } from "styled-components";

import BeerItem from "@/components/BeerItem";
import BeerItemPlaceholder from "@/components/BeerItem/BeerItemPlaceholder";

const Input = ({ className, beers, loading }) => {
  if (loading) {
    return (
      <div className={className}>
        {[...Array(5).keys()].map((el, key) => (
          <BeerItemPlaceholder key={key} />
        ))}
      </div>
    );
  }
  return (
    <div className={className}>
      {beers.map((beer, key) => (
        <BeerItem beer={beer} key={key} onClick={() => console.log(beer)} />
      ))}
    </div>
  );
};

export default styled(Input)(
  () =>
    css`
      margin-top: 2rem;
      margin-bottom: 2rem;
      margin-left: -1rem;
      margin-right: -1rem;
    `
);
