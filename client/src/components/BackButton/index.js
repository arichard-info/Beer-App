import React from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ className, onClick }) => {
  const history = useHistory();
  if (typeof onClick !== "function") {
    onClick = () => {
      history.push("/home");
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
