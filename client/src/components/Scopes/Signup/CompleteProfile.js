import React from "react";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { completeProfile } from "@/utils/api/authentication";
import { pattern as emailPattern } from "@/config/email";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

const CompleteProfile = ({ className }) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const name = params.get("name") || "";
  const email = params.get("email") || "";

  const { register, handleSubmit, formState: { errors = {} } = {} } = useForm();

  const submitForm = async (data, e) => {
    e.preventDefault();
    if (valid) {
      const finalUser = await completeProfile(data);

      if (finalUser && !finalUser.error) {
        authDispatch({ type: "user/logIn", payload: finalUser });
      } else {
        authDispatch({ type: "user/logOut" });
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
            error={!!errors.name}
            {...register("name", { required: "Tu dois remplir ce champs" })}
          />
        </FieldWrapper>
        <FieldWrapper label="Email" error={errors.email}>
          <TextInput
            name="email"
            placeholder="Email"
            defaultValue={email}
            error={!!errors.email}
            {...register("email", {
              required: "Tu dois saisir une adresse email valide",
              pattern: {
                value: emailPattern,
                message: "Tu dois renseigner une adresse email valide",
              },
            })}
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
