import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import TextInput from "./TextInput";
import FieldWrapper from "./FieldWrapper";
import { useForm } from "./utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({
  className,
  togglable = false,
  onChange = () => {},
  value,
}) => {
  const { password = "", confirm = "" } = value;
  const { fields = {}, validateField, removeField } = useForm();
  const [visible, setVisible] = useState(false);

  let errors = fields?.passwordConfirm?.error;

  const checkTags = {
    too_short: "6 caractères min",
    not_uppercase: "1 majuscule",
    not_lowercase: "1 minuscule",
    not_confirmed: "Confirmation",
  };

  const customValidation = (value = {}) => {
    const { password = "", confirm = "" } = value;
    let errors = [];
    if (password.length < 6) errors.push("too_short");
    if (confirm !== password || confirm === "") errors.push("not_confirmed");
    if (!password || !password.match(/[A-Z]/)) errors.push("not_uppercase");
    if (!password || !password.match(/[a-z]/)) errors.push("not_lowercase");
    return errors.length ? errors : false;
  };

  const handleChange = (field) => (e) => {
    validateField(
      "passwordConfirm",
      { ...value, [field]: e.target.value },
      { custom: customValidation }
    );
    onChange({ ...value, [field]: e.target.value });
  };

  useEffect(() => {
    validateField(
      "passwordConfirm",
      { password, confirm },
      { custom: customValidation }
    );
    return () => removeField("passwordConfirm");
  }, []);

  return (
    <div className={className}>
      <FieldWrapper label="Mot de passe" htmlFor="password">
        <div className="password">
          <TextInput
            value={password}
            id="password"
            name="password"
            onChange={handleChange("password")}
            type={visible ? "text" : "password"}
          />
          {togglable && (
            <button
              className="reveal-button"
              type="button"
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          )}
        </div>
      </FieldWrapper>
      <FieldWrapper label="Confirmation du mot de passe" htmlFor="confirm">
        <div className="confirmation">
          <TextInput
            name="confirm"
            id="confirm"
            value={confirm}
            type="password"
            onChange={handleChange("confirm")}
          />
        </div>
      </FieldWrapper>
      <div>
        {Object.entries(checkTags).map(([key, label]) => (
          <span
            key={key}
            className={`check-tag ${
              !(errors && !!errors.length && errors.includes(key))
                ? "valid"
                : "error"
            }`}
          >
            {!(errors && !!errors.length && errors.includes(key)) && (
              <FontAwesomeIcon icon={faCheck} />
            )}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default styled(PasswordInput)(
  ({ theme: { colors, fw } }) => css`
    position: relative;
    .confirmation,
    .password {
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
      svg {
        margin-right: 0.5rem;
      }
      &.valid {
        background-color: #cff7ec;
        color: #129272;
      }
    }
  `
);
