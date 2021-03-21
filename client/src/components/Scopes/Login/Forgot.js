import React from "react";
import { useHistory, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import { pattern as emailPattern } from "@/config/email";

import { forgot } from "@/utils/api/authentication";

const Forgot = ({ className }) => {
  let history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const submitForm = async (data, e) => {
    e.preventDefault();
    const response = await forgot(data.email);
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
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Email" error={errors.email}>
          <TextInput
            name="email"
            placeholder="Email"
            ref={register({
              required: "Ce champs est obligatoire",
              pattern: {
                value: emailPattern,
                message: "Tu dois renseigner une adresse email valide",
              },
            })}
            error={!!errors.email}
          />
        </FieldWrapper>

        <button type="submit" className="cta">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default styled(Forgot)(() => css``);
