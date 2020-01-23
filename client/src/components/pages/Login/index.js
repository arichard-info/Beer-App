import React, { useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import OAuth from "./OAuth";
import { useUser } from "./../../../state/authentication";
import { login } from "./../../../utils/api/authentication";

const socket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:5000");

const LoginPage = ({ className }) => {
  const providers = ["google"];
  const [, dispatch] = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) dispatch({ type: "LOG_IN", value: user });
    // TODO : Alert if no user
  };
  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
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
          <Link to="/login/forgot">Mot de passe oublié?</Link>
        </div>
        <div className="form-row">
          <input type="submit" value="Connexion" />
        </div>
      </form>

      <div className="form-row">
        <span>OR</span>
      </div>

      <div className="form-row">
        {providers.map(provider => (
          <OAuth provider={provider} key={provider} socket={socket} />
        ))}
      </div>
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
