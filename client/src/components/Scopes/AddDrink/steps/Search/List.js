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
  onChoose,
}) => {
  const handleNoResultClick = () => {
    onChoose();
  };

  if (!beers.length && !loading)
    return (
      <div className={className}>
        <h2 data-nrt="beers-count">Aucune bière trouvée</h2>
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
      <div className={className} data-nrt="beers-list">
        <h2 data-nrt="beers-count">{totalCount} bière(s) trouvée(s)</h2>
        {beers.map((beer, key) => (
          <BeerItem
            customClass="beer-item"
            beer={beer}
            key={key}
            onClick={() => onChoose(beer)}
          />
        ))}
        {showMoreCta && (
          <button className="cta" onClick={onViewMore} data-nrt="beers-more">
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
      margin-top: 2rem;

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
        margin: 0;
        h2 {
          font-size: 1.4rem;
        }
      }
    `
);
