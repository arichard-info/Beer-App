import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "./utils";

export const Label = styled.label`
  color: ${(props) => props.theme.colors.formLabel};
  font-weight: ${(props) => props.theme.fw.bold};
  font-size: 1.6rem;
  display: block;
`;

export const ValidationMessage = styled.p`
  font-size: 1.1rem;
  font-weight: ${(props) => props.theme.fw.semibold};
  color: ${(props) => props.theme.colors.formError};
  margin: 0;
  line-height: 1.5;
`;

export const FormRow = styled.div`
  margin-bottom: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  align-items: center;
  label {
    grid-column: 1 / 2;
    grid-row: 1;
  }

  div {
    grid-column: 1 / 3;
    grid-row: 2;
  }

  p {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  ${(props) =>
    props.inline &&
    css`
      label {
        grid-column: 1 / 2;
        grid-row: 1;
      }

      div {
        grid-column: 2 / 3;
        grid-row: 1;
      }

      p {
        grid-column: 2 / 3;
        grid-row: 2;
      }
    `}
`;

const FieldWrapper = ({
  fieldName = "",
  inline = false,
  label = "",
  htmlFor = "",
  children,
}) => {
  const { fields, showErrors } = useForm();
  return (
    <FormRow data-nrt={`field-${fieldName || htmlFor}`} inline={inline}>
      <Label htmlFor={htmlFor || fieldName}>{label}</Label>
      <div>{children}</div>
      {showErrors && !!fields[fieldName] && fields[fieldName].error && (
        <ValidationMessage error>{fields[fieldName].error}</ValidationMessage>
      )}
    </FormRow>
  );
};

export default FieldWrapper;
