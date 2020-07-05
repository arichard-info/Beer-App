import React, { useEffect, useRef, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Flash = React.memo(
  ({ className, message = "", timeout = 2000, calls = 0, onRemove }) => {
    const [leaving, setLeaving] = useState(false);
    let timeoutRef = useRef();

    const handleFadeOut = useCallback(() => setLeaving(true), [setLeaving]);

    const handleRemove = () => {
      if (leaving) onRemove();
    };

    useEffect(() => {
      if (timeout) timeoutRef.current = setTimeout(handleFadeOut, timeout);
      return () => clearTimeout(timeoutRef.current);
    }, [handleFadeOut, timeout, timeoutRef, calls]);

    return (
      <div
        className={`${className}${leaving ? " fading-out" : " fading-in"}`}
        onAnimationEnd={handleRemove}
        onClick={handleFadeOut}
      >
        <p>{message}</p>
        <button onClick={handleFadeOut}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.calls === nextProps.calls
);

export default styled(Flash)(
  ({ theme: { fw, colors, timings }, type = "success" }) => css`
    @keyframes fadeOut {
      0% {
        transform: translate3d(0, 0, 0);
      }
      70% {
        transform: translate3d(calc(100% + 2rem), 0, 0);
        max-height: 5rem;
      }
      100% {
        transform: translate3d(calc(100% + 2rem), 0, 0);
        max-height: 0;
      }
    }

    @keyframes fadeIn {
      0% {
        transform: translate3d(calc(100% + 2rem), -100%, 0);
        max-height: 0;
      }
      30% {
        transform: translate3d(calc(100% + 2rem), 0, 0);
        max-height: 5rem;
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    color: ${colors.white};
    padding: 1.3rem 1.6rem;
    font-size: 1.4rem;
    font-weight: ${fw.semibold};
    border-radius: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    pointer-events: all;

    &.fading-out {
      animation: fadeOut 0.6s ${timings.bounce};
    }

    &.fading-in {
      animation: fadeIn 0.6s ${timings.bounce};
    }

    button {
      margin-left: 1rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      color: ${colors.white};
      font-size: 1.6rem;
    }

    p {
      margin: 0;
    }

    ${() => {
      switch (type) {
        case "success":
          return `background-color: ${colors.flashSuccess}`;
        case "danger":
          return `background-color: ${colors.flashDanger}`;
        case "warning":
          return `background-color: ${colors.warning}`;
        default:
          return `background-color: ${colors.flashInfo}`;
      }
    }}
  `
);
