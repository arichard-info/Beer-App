import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import CheckTags from "@/components/Global/Form/CheckTags";

import { validate as validatePassword } from "@/config/password";
import { pattern as emailPattern } from "@/config/email";
import { signup } from "@/utils/api/authentication";

const Signup = ({ className }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors = {} } = {},
    watch,
  } = useForm();

  const passwordRef = useRef({});
  const passwordConfirmRef = useRef({});
  passwordRef.current = watch("password", "");
  passwordConfirmRef.current = watch("passwordConfirm", "");

  const submitForm = async (data, e) => {
    e.preventDefault();
    const user = await signup(data);
    if (user && !user.error) dispatch({ type: " user/logIn", payload: user });
    else {
      console.error("Error when trying to signup", user.message || "");
    }
  };

  return (
    <div className={className}>
      <Link to="/">Retour</Link>
      <h1>Créer un compte</h1>

      <form
        onSubmit={handleSubmit(submitForm)}
        noValidate
        data-nrt="signup-form"
      >
        <FieldWrapper label="Nom / Prénom" error={errors.name}>
          <TextInput
            name="name"
            placeholder="Nom / Prénom"
            error={!!errors.name}
            data-nrt="input-name"
            {...register("name", { required: "Tu dois remplir ce champs" })}
          />
        </FieldWrapper>
        <FieldWrapper label="Adresse email" error={errors.email}>
          <TextInput
            name="email"
            placeholder="Email"
            type="email"
            error={!!errors.email}
            data-nrt="input-email"
            {...register("email", {
              required: "Tu dois renseigner ton adresse email",
              pattern: {
                value: emailPattern,
                message: "Tu dois renseigner une adresse email valide",
              },
            })}
          />
        </FieldWrapper>
        <FieldWrapper label="Mot de passe" error={errors.password}>
          <TextInput
            type="password"
            placeholder="Mot de passe"
            name="password"
            error={!!errors.password}
            data-nrt="input-password"
            {...register("password", {
              validate: (value) => !validatePassword(value).length,
            })}
          />
        </FieldWrapper>
        <FieldWrapper label="Confirmation" error={errors.passwordConfirm}>
          <TextInput
            type="password"
            placeholder="Confirmation"
            name="passwordConfirm"
            data-nrt="input-passwordconfirm"
            error={!!errors.passwordConfirm}
            {...register("passwordConfirm", {
              validate: (value) => value && value === passwordRef.current,
            })}
          />
        </FieldWrapper>

        <CheckTags
          password={passwordRef.current}
          confirm={passwordConfirmRef.current}
        />

        <button type="submit" className="cta">
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default styled(Signup)(() => css``);
