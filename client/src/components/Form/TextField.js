import React, { useState } from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  onFocusOut,
  togglePassword = false
}) => {
  const [revealed, setRevealed] = useState(false);
  const togglable = type === "password" && togglePassword;
  return (
    <div
      className={`${className} ${
        validation && errors.length > 0 ? "error" : ""
      }`}
    >
      <div class="label-wrapper">
        {label && <label htmlFor={name}>{label}</label>}
        <div class="validation-wrapper">
          {validation &&
            errors.length > 0 &&
            errors.map((el, key) => (
              <p class="error-message" key={key}>
                {el}
              </p>
            ))}
        </div>
      </div>

      <div className="input-wrapper">
        <input
          className={`${togglable ? "togglable" : ""}`}
          name={name}
          id={name}
          type={togglable && revealed ? "text" : type}
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
        {togglable && (
          <button
            className="reveal-button"
            type="button"
            onClick={() => setRevealed(!revealed)}
          >
            {revealed ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </button>
        )}
      </div>

      {infos}
    </div>
  );
};

export default styled(TextField)(
  ({ theme: { colors, fw } }) => css`
    .label-wrapper {
      display: flex;
      align-items: flex-end;
      margin-bottom: 1rem;
      label {
        color: ${colors.formLabel};
        font-weight: ${fw.bold};
        font-size: 1.6rem;
        display: block;
      }
      .validation-wrapper {
        margin-left: 1.5rem;
      }
      .error-message {
        font-size: 1.1rem;
        font-weight: ${fw.semibold};
        color: ${colors.formError};
        margin: 0;
        line-height: 1.5;
      }
    }
    input {
      color: ${colors.formLabel};
      border: 0.1rem solid ${colors.formBorder};
      width: 100%;
      font-size: 1.6rem;
      border-radius: 1rem;
      padding: 1rem;
      transition: border-color 0.1s ease, box-shadow 0.2s ease;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1);
      &.togglable {
        padding-right: 5rem;
      }
      &:focus {
        border-color: ${colors.primary};
        box-shadow: 0px 0px 3px 0px rgba(255, 191, 0, 1);
        outline: none;
      }
    }
    a {
      font-size: 1.4rem;
      color: ${colors.linkSecond};
      margin-top: 0.75rem;
      display: block;
    }

    &.error {
      input {
        border-color: ${colors.formError};
        &:focus {
          box-shadow: 0px 0px 3px rgba(254, 124, 141, 1);
        }
      }
    }

    .input-wrapper {
      position: relative;
    }

    .reveal-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 1.6rem;
      color: ${colors.linkSecond};
      margin-right: 1rem;
    }
  `
);
