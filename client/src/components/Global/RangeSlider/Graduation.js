import React from "react";
import styled, { css } from "styled-components";
import { classNames } from "@/utils";

const Graduation = ({ className = "", graduations = [], vertical = false }) => (
  <div className={classNames(className, { vertical })}>
    {graduations.map((item, key) => (
      <span key={key}>{item}</span>
    ))}
  </div>
);

export default styled(Graduation)(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0 0.5rem 1.5rem;
    font-size: 1.3rem;
    color: ${colors.grey5};
    &.vertical {
      flex-direction: column;
    }
  `
);
