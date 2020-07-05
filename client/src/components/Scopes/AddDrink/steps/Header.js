import React from "react";
import styled, { css } from "styled-components";
import BackButton from "@/components/Global/BackButton";

const Header = ({ className, title, children }) => {
  return (
    <div className={className}>
      <BackButton />
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default styled(Header)(
  ({ theme: { colors } }) => css`
    margin-right: -1rem;
    padding-right: 1rem;
    padding-top: 4rem;
    padding-bottom: 2rem;
    padding-left: 4rem;
    background-color: ${colors.white};
    position: sticky;
    top: 0;
  `
);
