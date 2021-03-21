import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import PasswordMatch from "@/components/Global/Form/PasswordMatch";
import { validate as validatePassword } from "@/config/password";

import { useUser } from "@/state/authentication";
import { signup } from "@/utils/api/authentication";

const Signup = ({ className }) => {
  const [, authDispatch] = useUser();

  const { register, handleSubmit, errors, watch } = useForm();

  const passwordRef = useRef({});
  const passwordConfirmRef = useRef({});
  passwordRef.current = watch("password", "");
  passwordConfirmRef.current = watch("passwordConfirm", "");

  const submitForm = async (data) => {
    e.preventDefault();
    if (valid) {
      const user = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirm,
      });
      if (user && !user.error) authDispatch({ type: "LOG_IN", value: user });
      else {
        console.error("Error when trying to signup", user.message || "");
      }
    }
  };

  return (
    <div className={className}>
      <Link to="/">Retour</Link>
      <h1>Créer un compte</h1>

      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Nom / Prénom" error={errors.name}>
          <TextInput
            name="name"
            ref={register({ required: "Tu dois remplir ce champs" })}
            error={!!errors.name}
          />
        </FieldWrapper>
        <FieldWrapper label="Adresse email" error={errors.email}>
          <TextInput
            name="email"
            ref={register({
              required: "Tu dois renseigner ton adresse email",
            })}
            error={!!errors.email}
          />
        </FieldWrapper>
        <FieldWrapper label="Mot de passe" error={errors.password}>
          <TextInput
            type="password"
            name="password"
            ref={register({
              validate: (value) => !validatePassword(value).length,
            })}
            error={!!errors.password}
          />
        </FieldWrapper>
        <FieldWrapper label="Confirmation" error={errors.passwordConfirm}>
          <TextInput
            type="password"
            name="passwordConfirm"
            ref={register({
              validate: (value) => value && value === passwordRef.current,
            })}
            error={!!errors.passwordConfirm}
          />
        </FieldWrapper>
        <PasswordMatch
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
