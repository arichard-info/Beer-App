import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "./utils";

const FieldWrapper = ({
  className,
  fieldName = "",
  showError = false,
  inline = false,
  label = "",
  htmlFor = "",
  children,
}) => {
  const { fields } = useForm();
  return (
    <div className={className}>
      <label htmlFor={htmlFor || fieldName}>{label}</label>
      <div>{children}</div>
      {showError && !!fields[fieldName] && fields[fieldName].error && (
        <p>{fields[fieldName].error}</p>
      )}
    </div>
  );
};

export default styled(FieldWrapper)(() => css``);
