import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { fixElement as fixBody, unfixElement as unfixBody } from "@/utils/dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Panel = ({ className, children, open, childProps, onClose }) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [props, setProps] = useState(childProps);

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      if (childProps) {
        setProps(childProps);
      }
    }
  }, [open, children]);

  const onAnimationEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  if (shouldRender) {
    return createPortal(
      <div
        className={className}
        onAnimationEnd={onAnimationEnd}
        style={{ animation: `${open ? "slideFromRight" : "slideToRight"} .4s` }}
      >
        <div className="overlay" />
        <div className="panel">
          <div className="header">
            <button onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="body">
            {children && typeof children === "function" && children(props)}
          </div>
        </div>
      </div>,
      document.body
    );
  } else return <></>;
};

export default styled(Panel)(
  ({ theme: { colors, device } }) => css`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    .panel {
      background-color: ${colors.white};
      height: 100%;
      width: 100%;
    }

    @keyframes slideFromRight {
      0% {
        transform: translate3d(100%, 0, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes slideToRight {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(100%, 0, 0);
      }
    }

    @media ${device.gtMobile} {
      backdrop-filter: blur(2px);
      background-color: rgba(0, 0, 0, 0.2);
      .panel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 50rem;
        height: auto;
        box-shadow: 0 0.5rem 0.4rem 0 rgba(0, 0, 0, 0.1);
        border-radius: 1.5rem;
      }

      @keyframes slideFromRight {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes slideToRight {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
  `
);
