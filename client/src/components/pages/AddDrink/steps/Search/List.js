import React from "react";
import styled, { css } from "styled-components";

import BeerItem from "@/components/BeerItem";
import BeerItemPlaceholder from "@/components/BeerItem/BeerItemPlaceholder";

const Input = ({ className, beers, loading, onViewMore, totalCount = 0 }) => {
  if (!beers.length && loading) {
    return (
      <div className={className}>
        {[...Array(10).keys()].map((el, key) => (
          <BeerItemPlaceholder key={key} />
        ))}
      </div>
    );
  }

  const showMoreCta = !loading && totalCount > beers.length;
  return (
    <>
      <div className={className}>
        {beers.map((beer, key) => (
          <BeerItem beer={beer} key={key} onClick={() => console.log(beer)} />
        ))}
        {showMoreCta && (
          <button className="cta" onClick={onViewMore}>
            Charger plus ...
          </button>
        )}
      </div>
    </>
  );
};

export default styled(Input)(
  () =>
    css`
      margin-top: 2rem;
      margin-bottom: 2rem;
      margin-left: -1rem;
      margin-right: -1rem;

      button {
        margin: 1.5rem 1rem;
      }
    `
);
