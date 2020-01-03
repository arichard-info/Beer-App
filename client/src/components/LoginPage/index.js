import React from "react";
import styled, { css } from "styled-components";

const LoginPage = ({ className }) => {
  return (
    <div className={className}>
      <form>
        <div class="form-row">
          <label for="">Nom d'utilisateur ou adresse email</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div class="form-row">
          <label for="">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form-row">
          <input type="submit" value="Connexion" />
        </div>
      </form>
    </div>
  );
};

export default styled(LoginPage)(
  () => css`
    label {
      display: block;
    }
  `
);
