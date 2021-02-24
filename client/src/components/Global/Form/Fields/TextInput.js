import React from "react";
import styled, { css } from "styled-components";

const TextInput = ({ className, name, suffix, error, ...rest }) => {
  return (
    <div className={className}>
      <Input error={error} name={name} {...rest} />
      {suffix && <span className="suffix">{suffix}</span>}
    </div>
  );
};

const Input = styled.input`
  width: 100%;
  color: ${(props) => props.theme.colors.formLabel};
  border: 0.1rem solid ${(props) => props.theme.colors.formBorder};
  width: 100%;
  font-size: 1.6rem;
  border-radius: 1rem;
  padding: 1rem;
  transition: border-color 0.1s ease, box-shadow 0.2s ease;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0.3rem 0 rgba(255, 191, 0, 1);
    outline: none;
    ${(props) =>
      props.error &&
      css`
        box-shadow: 0 0 0.3rem rgba(254, 124, 141, 1) !important;
      `}
  }

  ${(props) =>
    props.error &&
    css`
      border-color: ${props.theme.colors.formError};
    `}
`;

export default styled(TextInput)(
  ({ theme: { colors } }) => css`
    position: relative;
    .suffix {
      position: absolute;
      right: 4rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.3rem;
      font-weight: 700;
      color: ${colors.linkSecond};
    }
  `
);
