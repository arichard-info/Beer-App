import React from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import OAuth from "./OAuth";
import { useUser } from "./../../../state/authentication";
import { login } from "./../../../utils/api/authentication";
import Form from "./../../Form";

const LoginPage = ({ className }) => {
  const providers = ["google"];
  const [, dispatch] = useUser();

  const socket = io(
    process.env.REACT_APP_SERVER_URL || "http://localhost:5000"
  );

  const handleSubmit = async ({ email, password }) => {
    const user = await login(email.value, password.value);
    if (user && !user.error) dispatch({ type: "LOG_IN", value: user });
    // TODO : Alert if no user
  };

  const fields = {
    email: {
      field: "textField",
      type: "email",
      placeholder: "Nom d'utilisateur",
      label: "Adresse email"
    },
    password: {
      field: "textField",
      type: "password",
      placeholder: "Mot de passe",
      label: "Mot de passe"
    }
  };

  return (
    <div className={className}>
      <Form
        onValidSubmit={handleSubmit}
        fields={fields}
        submitLabel="Connexion"
      />

      <div className="form-row">
        <span>OR</span>
      </div>

      <div className="form-row">
        {providers.map(provider => (
          <OAuth provider={provider} key={provider} socket={socket} />
        ))}
      </div>
      <div className="form-row">
        <Link to="/signup">Créer un compte</Link>
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
