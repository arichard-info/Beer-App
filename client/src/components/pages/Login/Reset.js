import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { resetPassword } from "@/utils/api/authentication";
import { useUser } from "@/state/authentication";
import Form from "@/components/Form";

const Forgot = ({ className }) => {
  const [, dispatch] = useUser();
  const { token } = useParams();

  const submitForm = async fields => {
    const { password } = fields;
    const user = await resetPassword(token, {
      password: password.value.password,
      passwordConfirm: password.value.confirm
    });
    if (user && !user.error) dispatch({ type: "LOG_IN", value: user });
  };

  const fields = {
    password: {
      field: "passwordConfirm",
      label: "Mot de passe",
      confirmLabel: "Confirmation du mot de passe",
      placeholder: "Mot de passe",
      confirmPlaceholder: "Confirmation du mot de passe"
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
