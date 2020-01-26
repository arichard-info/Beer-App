import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { resetPassword } from "./../../../utils/api/authentication";
import { useUser } from "./../../../state/authentication";
import Form from "./../../Form";

const Forgot = ({ className }) => {
  const [, dispatch] = useUser();
  const { token } = useParams();

  const submitForm = async fields => {
    const user = await resetPassword(token, {
      password: fields.password.value,
      passwordConfirm: fields.passwordConfirm.value
    });
    if (user && !user.error) dispatch({ type: "LOG_IN", value: user });
  };

  const fields = {
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

  return (
    <div className={className}>
      <h1>Nouveau mot de passe</h1>
      <Form fields={fields} onValidSubmit={submitForm} submitLabel="Envoyer" />
    </div>
  );
};

export default styled(Forgot)(() => css``);
