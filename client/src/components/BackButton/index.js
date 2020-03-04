import React from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ className, onClick }) => {
  if (typeof onClick !== "function") {
    onClick = () => {
      // TODO implement history push previous location here
    };
  }
  return (
    <button className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default styled(BackButton)(
  () => css`
    border: none;
    background-color: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
  `
);
