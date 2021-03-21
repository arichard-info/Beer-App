import React from "react";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useUser } from "@/state/authentication";
import { completeProfile } from "@/utils/api/authentication";
import { pattern as emailPattern } from "@/config/email";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

const CompleteProfile = ({ className }) => {
  const [, authDispatch] = useUser();
  let location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const name = params.get("name") || "";
  const email = params.get("email") || "";

  const { register, handleSubmit, errors } = useForm();

  const submitForm = async (data, e) => {
    e.preventDefault();
    if (valid) {
      const finalUser = await completeProfile(data);

      if (finalUser && !finalUser.error) {
        authDispatch({ type: "LOG_IN", value: finalUser });
      } else {
        authDispatch({ type: "REMOVE" });
        history.push("/");
        console.error("Invalid user");
      }
    }
  };

  return (
    <div className={className}>
      <h1>Compléter le profil</h1>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Nom / Prénom" error={errors.name}>
          <TextInput
            name="name"
            placeholder="Nom / Prénom"
            defaultValue={name}
            ref={register({ required: "Tu dois remplir ce champs" })}
            error={!!errors.name}
          />
        </FieldWrapper>
        <FieldWrapper label="Email" error={errors.email}>
          <TextInput
            name="email"
            placeholder="Email"
            defaultValue={email}
            ref={register({
              required: "Tu dois saisir une adresse email valide",
              pattern: {
                value: emailPattern,
                message: "Tu dois renseigner une adresse email valide",
              },
            })}
            error={!!errors.email}
          />
        </FieldWrapper>
        <button type="submit" className="cta">
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default styled(CompleteProfile)(() => css``);
