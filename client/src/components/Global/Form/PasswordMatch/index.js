import React, { useMemo } from "react";
import CheckTag from "./CheckTag";
import styled, { css } from "styled-components";
import { validate, rules } from "@/config/password";

const PasswordMatch = ({ className, password, confirm }) => {
  const errors = useMemo(() => validate(password), [password]);
  return (
    <div className={className}>
      {Object.entries(rules).map(([key, rule]) => (
        <CheckTag key={key} valid={!errors.includes(key)} label={rule.name} />
      ))}
      <CheckTag valid={confirm && password === confirm} label="Confirmation" />
    </div>
  );
};

export default styled(PasswordMatch)(
  () => css`
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
  `
);
