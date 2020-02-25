import React from "react";
import styled, { css } from "styled-components";

const Search = ({ className }) => {
  return (
    <div className={className}>
      <button className="back"></button>
      <h1>Ajoute ta bière</h1>
    </div>
  );
};

export default styled(Search)(() => css``);
