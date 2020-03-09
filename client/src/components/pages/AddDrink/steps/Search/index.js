import React from "react";
import styled, { css } from "styled-components";

import { useBeers } from "@/utils/api/hooks";
import BackButton from "@/components/BackButton";

import Input from "./Input";
import List from "./List";

const Search = ({ className }) => {
  const [beers, loading] = useBeers();
  return (
    <div className={className}>
      <div className="header">
        <BackButton />
        <h1>Ajoute ta bière</h1>
        <Input />
      </div>

      <List beers={beers} loading={loading} />
    </div>
  );
};

export default styled(Search)(
  ({ theme: { colors } }) => css`
    .header {
      padding-top: 4rem;
      padding-bottom: 2rem;
      background-color: ${colors.white};
      position: sticky;
      top: 0;
    }
  `
);
