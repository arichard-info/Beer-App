import React from "react";
import styled, { css } from "styled-components";
import TextField from "./TextField";

const checkTags = {
  too_short: "6 caractères min",
  not_uppercase: "1 majuscule",
  not_lowercase: "1 minuscule",
  not_confirmed: "Confirmation"
};

const PasswordConfirm = ({
  className,
  value = {},
  label,
  confirmLabel,
  placeholder,
  confirmPlaceholder,
  onChange,
  errors,
  validation
}) => {
  const changePassword = field =>
    onChange({
      name: "password",
      value: { ...value, ...{ [field.name]: field.value } }
    });

  const { password = "", confirm = "" } = value;

  return (
    <div
      className={`${className} ${validation && errors.length > 0 && "error"}`}
    >
      <div className="form-row">
        <TextField
          value={password}
          name="password"
          type="password"
          placeholder={placeholder}
          label={label}
          onChange={changePassword}
        />
      </div>
      <div className="form-row">
        <TextField
          value={confirm}
          name="confirm"
          type="password"
          placeholder={confirmPlaceholder}
          label={confirmLabel}
          onChange={changePassword}
        />
      </div>

      <div className="form-row">
        {Object.keys(checkTags).map(el => (
          <span
            key={el}
            className={`check-tag ${!errors.includes(el) ? "valid" : "error"}`}
          >
            {checkTags[el]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default styled(PasswordConfirm)(
  ({ theme: { colors, fw } }) => css`
    .check-tag {
      display: inline-block;
      background-color: #f3f5f7;
      color: ${colors.linkSecond};
      font-weight: ${fw.medium};
      font-size: 1.2rem;
      padding: 0.5rem 1.5rem;
      margin: 0 1rem 1rem 0;
      border-radius: 50rem;
      transition: all 0.2s ease;
      &.valid {
        background-color: #cff7ec;
        color: #129272;
      }
    }
  `
);