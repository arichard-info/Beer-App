import React from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Tag = styled.span`
  display: inline-block;
  background-color: #f3f5f7;
  color: ${(props) => props.theme.colors.linkSecond};
  font-weight: ${(props) => props.theme.fw.medium};
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;
  margin: 0 1rem 1rem 0;
  border-radius: 50rem;
  transition: all 0.2s ease;
  svg {
    margin-right: 0.5rem;
  }

  ${(props) =>
    props.error &&
    css`
      background-color: #f2dce0;
      color: ${props.theme.colors.formError};
    `}

  ${(props) =>
    props.valid &&
    css`
      background-color: #cff7ec;
      color: #129272;
    `}
`;

const CheckTag = ({ error = true, showError = false, label = "" }) => (
  <Tag valid={!error} error={error && showError}>
    {!error && <FontAwesomeIcon icon={faCheck} />}
    {label}
  </Tag>
);

export default CheckTag;
