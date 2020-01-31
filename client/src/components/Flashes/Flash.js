import React, { useEffect, useRef, useCallback, useState } from "react";
import styled, { css } from "styled-components";

const Flash = React.memo(
  ({ className, type, message, timeout, onRemove }) => {
    const [leaving, setLeaving] = useState(false);
    let timeoutRef = useRef();

    const handleFadeOut = useCallback(() => setLeaving(true), [setLeaving]);

    const handleRemove = () => {
      if (leaving) onRemove();
    };

    useEffect(() => {
      if (timeout) timeoutRef.current = setTimeout(handleFadeOut, timeout);
      return () => clearTimeout(timeoutRef.current);
    }, [handleFadeOut, timeout, timeoutRef]);

    return (
      <div
        className={`${className} ${leaving ? "fading-out" : "fading-in"}`}
        onAnimationEnd={handleRemove}
        onClick={handleFadeOut}
      >
        {message}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.calls === nextProps.calls
);

export default styled(Flash)(
  ({ theme: { fw } }) => css`
    @keyframes fadeOut {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(calc(100% + 2rem), 0, 0);
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
    background-color: #fe7c8d;
    color: white;
    padding: 1.5rem;
    font-size: 1.4rem;
    font-weight: ${fw.semibold};
    border-radius: 1.5rem;
    margin-bottom: 2rem;

    &.fading-out {
      animation: fadeOut 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &.fading-in {
      animation: fadeIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `
);
