import React from "react";
import { useHistory, Link } from "react-router-dom";
import styled, { css } from "styled-components";

import Form from "@/components/Global/NewForm";
import FieldWrapper from "@/components/Global/NewForm/FieldWrapper";
import TextInput from "@/components/Global/NewForm/Fields/TextInput";
import { useFields } from "@/components/Global/NewForm/utils";

import { forgot } from "@/utils/api/authentication";

const Forgot = ({ className }) => {
  let history = useHistory();
  const { fields, handleEventChange } = useFields({ email: "" });

  const submitForm = async (e, { valid }) => {
    e.preventDefault();
    if (!valid) return;
    const response = await forgot(fields.email);
    if (response) {
      history.push("/");
      window.flash({
        message: "Email envoyé!",
        timeout: 3000,
      });
    } else
      window.flash({
        message: "Erreur lors de l'envoi du mail.",
        timeout: 5000,
      });
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
      <Form onSubmit={submitForm}>
        <FieldWrapper fieldName="email" label="Adresse email">
          <TextInput
            name="email"
            type="email"
            rules={{ required: true, pattern: "email" }}
            placeholder="Adresse email"
            value={fields.email}
            onChange={handleEventChange("email")}
          />
        </FieldWrapper>

        <button type="submit" className="cta">
          Envoyer
        </button>
      </Form>
    </div>
  );
};

export default styled(Forgot)(() => css``);
