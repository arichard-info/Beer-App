import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";

import CheckTag from "@/components/Global/Form/Fields/PasswordConfirm/CheckTag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({
  className,
  togglable = false,
  onChange = () => {},
  value,
  errors,
}) => {
  const [visible, setVisible] = useState(false);

  const checkTags = {
    too_short: "6 caractères min",
    not_uppercase: "1 majuscule",
    not_lowercase: "1 minuscule",
    not_confirmed: "Confirmation",
  };

  const handleChange = (field) => (e) => {
    onChange({ ...value, [field]: e.target.value });
  };

  return (
    <div className={className}>
      <FieldWrapper label="Mot de passe" htmlFor="password">
        <div className="password">
          <TextInput
            value={value.password}
            id="password"
            name="password"
            onChange={handleChange("password")}
            type={visible ? "text" : "password"}
            error={!!errors.length}
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
            value={value.confirm}
            type="password"
            onChange={handleChange("confirm")}
            error={!!errors.length}
          />
        </div>
      </FieldWrapper>
      <div>
        {Object.entries(checkTags).map(([key, label]) => (
          <CheckTag
            key={key}
            error={errors && !!errors.length && errors.includes(key)}
            showError={showErrors}
            label={label}
          />
        ))}
      </div>
    </div>
  );
};

export default styled(PasswordInput)(
  ({ theme: { colors, fw } }) => css`
    position: relative;
    margin-bottom: 1.6rem;
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
  `
);
