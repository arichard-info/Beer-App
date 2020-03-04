import React from "react";
import styled, { css } from "styled-components";
import BackButton from "./../../../BackButton";

const Search = ({ className }) => {
  return (
    <div className={className}>
      <BackButton />
      <h1>Ajoute ta bière</h1>
    </div>
  );
};

export default styled(Search)(() => css``);
