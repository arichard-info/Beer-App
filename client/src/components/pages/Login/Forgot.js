import React from "react";
import { useHistory, Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { forgot } from "@/utils/api/authentication";
import Form from "@/components/Form";

const Forgot = ({ className }) => {
  let history = useHistory();

  const submitForm = async fields => {
    const response = await forgot(fields.email.value);
    if (response) {
      history.push("/");
      window.flash({
        message: "Email envoyé!",
        timeout: 3000
      });
    } else
      window.flash({
        message: "Erreur lors de l'envoi du mail.",
        timeout: 5000
      });
  };

  const fields = {
    email: {
      field: "textField",
      type: "email",
      placeholder: "Adresse email",
      label: "Adresse email",
      required: true
    }
  };

  return (
    <div className={className}>
      <Link to="/">Retour</Link>
      <h1>Mot de passe oublié</h1>
      <p>
        Nous t’enverrons un email de vérification sur cette adresse. Tu pourras
        réinitialiser ton mot de passe à partir du liens qui se trouve dans le
        mail.
      </p>
      <Form fields={fields} onValidSubmit={submitForm} submitLabel="Envoyer" />
    </div>
  );
};

export default styled(Forgot)(() => css``);
