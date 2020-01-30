import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const Flash = ({ className, type, message, timeout, onRemove }) => {
  useEffect(() => {
    if (timeout) setTimeout(onRemove, timeout);
  });
  return <div className={className}>{message}</div>;
};

export default styled(Flash)(
  ({ theme: { fw } }) => css`
    @keyframes entering {
      0% {
        transform: translate3d(100%, 0, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    background-color: #fe7c8d;
    color: white;
    padding: 1.5rem;
    font-size: 1.4rem;
    font-weight: ${fw.semibold};
    border-radius: 1.5rem;
    margin-bottom: 2rem;
    animation: entering 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `
);
