import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { useUser } from "./../../../state/authentication";
import { signup } from "../../../utils/api/authentication";
import Form from "./../../Form";

const Forgot = ({ className }) => {
  const [, authDispatch] = useUser();

  const fields = {
    name: {
      field: "textField",
      type: "text",
      placeholder: "Nom / Prénom",
      label: "Nom / Prénom",
      required: true
    },
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
      required: true
    },
    passwordConfirm: {
      field: "textField",
      type: "password",
      placeholder: "Confirmation du mot de passe",
      label: "Confirmation du mot de passe",
      required: true
    }
  };

  const submitForm = async ({ name, email, password, passwordConfirm }) => {
    const user = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    });
    if (user && !user.error) authDispatch({ type: "LOG_IN", value: user });
    else {
      console.error("Error when trying to signup", user.message || "");
    }
  };
  return (
    <div className={className}>
      <Link to="/">Retour</Link>
      <h1>Créer un compte</h1>
      <Form onValidSubmit={submitForm} fields={fields} />
    </div>
  );
};

export default styled(Forgot)(() => css``);
