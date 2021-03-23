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
}) => {
  return (
    <header className={classNames(className, customClass)}>
      {back && <BackButton onClick={onBack} />}
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default styled(Header)(
  ({ theme: { colors, device } }) => css`
    max-width: 50rem;
    width: 100%;
    margin: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
    background-color: ${colors.white};
    position: sticky;
    top: 0;
    z-index: 1;

    @media ${device.gtMobile} {
      width: auto;
      max-width: none;
      padding-top: 4rem;
      padding-left: 4rem;
      margin-left: -4rem;
      padding-right: 4rem;
      margin-right: -4rem;
    }
  `
);
