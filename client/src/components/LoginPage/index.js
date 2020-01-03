import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

import { useUser } from "./../../state/authentication";

const LoginPage = ({ className }) => {
  const [, dispatch] = useUser();
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async e => {
    e.preventDefault();
    const response = await axios.post(`/api/login`, { email, password });
    if (response.status === 200 && response.data.token && response.data.user) {
      const { user, token } = response.data;
      dispatch({ type: "LOG_IN", value: { user, token } });
      history.push("/");
    }
  };
  return (
    <div className={className}>
      <form onSubmit={submitForm}>
        <div className="form-row">
          <label htmlFor="username">Nom d'utilisateur ou email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Nom d'utilisateur"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row">
          <input type="submit" value="Connexion" />
        </div>
      </form>
    </div>
  );
};

export default styled(LoginPage)(
  () => css`
    height: 100%;
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    label {
      display: block;
    }
    .form-row {
      margin: 0.4rem 0;
    }
  `
);
