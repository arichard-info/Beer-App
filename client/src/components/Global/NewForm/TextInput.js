import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useForm } from "./utils";

const TextInput = ({
  className,
  onChange = () => {},
  rules,
  name,
  suffix,
  ...rest
}) => {
  const { validateField, removeField } = useForm();

  useEffect(() => {
    if (rules && name) {
      validateField(name, rest.value || "", rules);
      return () => removeField(name);
    }
  }, []);

  const handleChange = (e) => {
    if (name && rules) {
      validateField(name, e.target.value, rules);
    }
    onChange(e);
  };

  return (
    <div className={className}>
      <input name={name} rules={rules} onChange={handleChange} {...rest} />
      {suffix && <span className="suffix">{suffix}</span>}
    </div>
  );
};

export default styled(TextInput)(
  ({ theme: { colors } }) => css`
    position: relative;
    input {
      width: 100%;
      color: ${colors.formLabel};
      border: 0.1rem solid ${colors.formBorder};
      width: 100%;
      font-size: 1.6rem;
      border-radius: 1rem;
      padding: 1rem;
      transition: border-color 0.1s ease, box-shadow 0.2s ease;
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);

      &:focus {
        border-color: ${colors.primary};
        box-shadow: 0 0 0.3rem 0 rgba(255, 191, 0, 1);
        outline: none;
      }
    }

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
