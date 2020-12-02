import React from "react";
import styled, { css } from "styled-components";

import BeerItem from "@/components/Global/BeerItem";
import BeerItemPlaceholder from "@/components/Global/BeerItem/BeerItemPlaceholder";
import NoResult from "./NoResult";

const List = ({
  className,
  beers,
  loading,
  onViewMore,
  totalCount = 0,
  setStep,
}) => {
  const handleNoResultClick = () => {
    setStep({ index: 1 });
  };

  const handleAddBeer = (beer) => {
    setStep((state) => ({ index: 3, beer, ...state }));
  };

  if (!beers.length && !loading)
    return (
      <div className={className}>
        <h2>Aucune bière trouvée</h2>
        <NoResult onClick={handleNoResultClick} />
      </div>
    );

  if (!beers.length && loading) {
    return (
      <div className={className}>
        <h2>Chargement...</h2>
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
        <h2>{totalCount} bière(s) trouvée(s)</h2>
        {beers.map((beer, key) => (
          <BeerItem
            customClass="beer-item"
            beer={beer}
            key={key}
            onClick={() => handleAddBeer(beer)}
          />
        ))}
        {showMoreCta && (
          <button className="cta" onClick={onViewMore}>
            Plus de bières
          </button>
        )}
      </div>
    </>
  );
};

export default styled(List)(
  ({ theme: { device } }) =>
    css`
      max-width: 50rem;
      margin: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-top: 2rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 1.1rem;
        font-weight: 700;
      }

      .beer-item {
        margin-left: -1rem;
        margin-right: -1rem;
      }

      button {
        margin: 1.5rem 0;
      }

      @media ${device.gtMobile} {
        max-width: none;
        margin: 0;
        padding-left: 4rem;
        padding-right: 0;
        h2 {
          font-size: 1.4rem;
        }
      }
    `
);
