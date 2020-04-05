import React from "react";
import styled, { css } from "styled-components";
import BackButton from "@/components/BackButton";

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
    padding-top: 4rem;
    padding-bottom: 2rem;
    background-color: ${colors.white};
    position: sticky;
    top: 0;
  `
);
