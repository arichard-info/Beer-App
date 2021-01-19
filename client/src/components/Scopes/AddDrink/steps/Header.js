import React from "react";
import styled, { css } from "styled-components";
import BackButton from "@/components/Global/BackButton";

const Header = ({ className, title, children, onBack = undefined }) => {
  return (
    <div className={className}>
      <BackButton onClick={onBack} />
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default styled(Header)(
  ({ theme: { colors, device } }) => css`
    max-width: 50rem;
    margin: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 4rem;
    padding-bottom: 2rem;
    background-color: ${colors.white};
    position: sticky;
    top: 0;

    @media ${device.gtMobile} {
      max-width: none;
      margin: 0;
      padding-left: 4rem;
      padding-right: 0;
      padding-right: 1rem;
      margin-right: -1rem;
      h2 {
        font-size: 1.4rem;
      }
    }
  `
);
