import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const HomeScreenPage = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <Link to="/signup">Créer un compte</Link>
      </div>
      <div>
        <Link to="/login">Connexion</Link>
      </div>
    </div>
  );
};

export default styled(HomeScreenPage)(
  () => css`
    height: 100%;
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
);
