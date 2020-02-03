import React from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import OAuth from "./OAuth";
import { useUser } from "./../../../state/authentication";
import { login } from "./../../../utils/api/authentication";
import Form from "./../../Form";

const LoginPage = ({ className }) => {
  const providers = [{ id: "google", name: "Google", icon: faGoogle }];
  const [, dispatch] = useUser();

  const socket = io(
    process.env.REACT_APP_SERVER_URL || "http://localhost:5000"
  );

  const handleSubmit = async ({ email, password }) => {
    const user = await login(email.value, password.value);
    if (user && !user.error) {
      dispatch({ type: "LOG_IN", value: user });
      window.flash({ message: "You are now logged in!" });
    }
    // TODO : Alert if no user
  };

  const fields = {
    email: {
      field: "textField",
      type: "email",
      placeholder: "Adresse email",
      label: "Adresse email",
      required: true
    },
    password: {
      field: "textField",
      type: "password",
      placeholder: "Mot de passe",
      label: "Mot de passe",
      infos: <Link to="/login/forgot">Mot de passe oublié ?</Link>,
      required: true
    }
  };

  return (
    <div className={className}>
      <h1>Connexion</h1>
      <Form
        onValidSubmit={handleSubmit}
        fields={fields}
        submitLabel="Connexion"
      />

      <button
        onClick={() => {
          window.flash({
            message: "Coucou ceci est un test",
            type: "info",
            timeout: 10000
          });
        }}
      >
        test
      </button>

      <button
        onClick={() => {
          window.flash({ message: "Coucou ceci est un yion" });
        }}
      >
        yion
      </button>

      <div className="sep">
        <span>ou</span>
      </div>

      <div className="others">
        <Link to="/signup" className="cta bg-grey">
          Créer un compte
        </Link>
        {providers.map(provider => (
          <OAuth provider={provider} key={provider} socket={socket} />
        ))}
      </div>
    </div>
  );
};

export default styled(LoginPage)(
  ({ theme: { colors } }) => css`
    .others {
      .cta {
        margin: 1.5rem 0;
      }
    }
    .sep {
      display: flex;
      justify-content: center;
      position: relative;
      margin: 3rem 0;
      span {
        background-color: ${colors.white};
        font-size: 1.4rem;
        display: inline-block;
        position: relative;
        z-index: 1;
        padding: 0 0.8rem;
      }
      &:after {
        content: "";
        z-index: 0;
        position: absolute;
        top: 50%;
        width: 100%;
        border-bottom: 0.1rem solid ${colors.formBorder};
      }
    }
  `
);
