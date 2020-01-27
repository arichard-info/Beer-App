import React from "react";
import styled, { css } from "styled-components";

const TextField = ({
  className,
  name = "",
  type = "text",
  value = "",
  label = "",
  required = false,
  placeholder = "",
  infos,
  errors,
  validation = false,
  onChange,
  onFocusOut
}) => {
  return (
    <div
      className={`${className} ${
        validation && errors.length > 0 ? "error" : ""
      }`}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onBlur={e => {
          if (typeof onFocusOut === "function") {
            onFocusOut({ name, value: e.target.value });
          }
        }}
        onChange={e => {
          if (typeof onChange === "function") {
            onChange({ name, value: e.target.value });
          }
        }}
      />
      {infos}
      {validation &&
        errors.length > 0 &&
        errors.map((el, key) => <p key={key}>{el}</p>)}
    </div>
  );
};

export default styled(TextField)(
  ({ theme: { colors, fw } }) => css`
    label {
      color: ${colors.formLabel};
      font-weight: ${fw.bold};
      font-size: 1.6rem;
      margin-bottom: 1rem;
      display: block;
    }
    input {
      color: ${colors.formLabel};
      border: 0.1rem solid ${colors.formBorder};
      width: 100%;
      font-size: 1.6rem;
      border-radius: 1rem;
      padding: 1rem;
      transition: border-color 0.1s ease;
    }
    a {
      font-size: 1.4rem;
      color: ${colors.linkSecond};
      margin-top: 0.75rem;
      display: block;
    }

    &.error {
      input {
        border-color: tomato;
      }
    }
  `
);
