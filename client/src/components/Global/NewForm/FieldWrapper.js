import React from "react";
import styled from "styled-components";
import { useForm } from "./utils";

export const Label = styled.label`
  color: ${(props) => props.theme.colors.formLabel};
  font-weight: ${(props) => props.theme.fw.bold};
  font-size: 1.6rem;
  display: block;
  margin-bottom: 1rem;
`;

export const ValidationMessage = styled.p`
  font-size: 1.1rem;
  font-weight: ${(props) => props.theme.fw.semibold};
  color: ${(props) => props.theme.colors.formError};
  margin: 0;
  margin-top: 0.5rem;
  line-height: 1.5;
`;

export const FormRow = styled.div`
  margin-bottom: 1.6rem;
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
    <FormRow>
      <Label htmlFor={htmlFor || fieldName}>{label}</Label>
      <div>{children}</div>
      {showErrors && !!fields[fieldName] && fields[fieldName].error && (
        <ValidationMessage error>{fields[fieldName].error}</ValidationMessage>
      )}
    </FormRow>
  );
};

export default FieldWrapper;
