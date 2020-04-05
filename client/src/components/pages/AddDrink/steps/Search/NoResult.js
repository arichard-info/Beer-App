import React from "react";
import styled, { css } from "styled-components";

const NoResult = ({ className, onClick }) => {
  return (
    <div className={className}>
      <button onClick={onClick}>Ajouter une bière</button>
    </div>
  );
};

export default styled(NoResult)(() => css``);
