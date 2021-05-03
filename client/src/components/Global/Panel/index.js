import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import BackButton from "@/components/Global/BackButton";

const Panel = ({
  className = "",
  children,
  open = false,
  childProps = {},
  onClose = () => {},
  ...rest
}) => {
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
        data-nrt={(rest && rest["data-nrt"]) || null}
        className={className}
        onAnimationEnd={onAnimationEnd}
        style={{ animation: `${open ? "slideFromRight" : "slideToRight"} .4s` }}
      >
        <div className="overlay" onClick={handleClose} />
        <div className="panel">
          <div className="header">{<BackButton onClick={handleClose} />}</div>
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
    z-index: 1;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    .panel {
      background-color: ${colors.white};
      height: 100%;
      width: 100%;
      overflow: hidden;
      padding: 1.6rem;
    }

    .body {
      max-width: 50rem;
      width: 100%;
      margin: auto;
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

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .body {
        max-width: none;
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
