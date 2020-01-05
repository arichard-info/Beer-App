import React, { useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

import OAuth from "./OAuth";
import { useUser } from "./../../../state/authentication";

const socket = io("http://localhost:5000");

const LoginPage = ({ className }) => {
  const providers = ["google"];
  const [, dispatch] = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async e => {
    e.preventDefault();
    const response = await axios.post(`/api/login`, { email, password });
    if (response.status === 200 && response.data.token && response.data.user) {
      const { user, token } = response.data;
      dispatch({ type: "LOG_IN", value: { user, token } });
    } else {
      console.error("Error whe trying to login");
      // TODO : Log error to user
    }
  };
  return (
    <div className={className}>
      {providers.map(provider => (
        <OAuth provider={provider} key={provider} socket={socket} />
      ))}

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
      <div className="form-row">
        <Link to="/login/forgot">Mot de passe oublié?</Link>
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
