import React from "react";
import styled, { css } from "styled-components";
import BackButton from "@/components/Global/BackButton";
import { classNames } from "@/utils";

const Header = ({
  className,
  customClass,
  title,
  children,
  onBack = undefined,
  back = true,
  sticky = false,
}) => {
  return (
    <header className={classNames(className, customClass, { sticky })}>
      {back && <BackButton onClick={onBack} />}
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default styled(Header)(
  ({ theme: { colors, device } }) => css`
    width: 100%;
    background-color: ${colors.white};
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.sticky {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 1;
    }

    @media ${device.gtMobile} {
      width: auto;
      max-width: none;
      margin-left: -4rem;
      margin-right: -4rem;
      padding-top: 4rem;
      padding-left: 4rem;
      padding-right: 4rem;
    }
  `
);
