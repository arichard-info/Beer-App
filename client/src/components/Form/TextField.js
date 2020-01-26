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
  onChange
}) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange({ name, value: e.target.value })}
      />
      {infos}
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
    }
    a {
      font-size: 1.4rem;
      color: ${colors.linkSecond};
      margin-top: 0.75rem;
      display: block;
    }
  `
);
