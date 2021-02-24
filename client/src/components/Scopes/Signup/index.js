import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useForm, Controller } from "react-hook-form";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

import { useUser } from "@/state/authentication";
import { signup } from "@/utils/api/authentication";

const Signup = ({ className }) => {
  const [, authDispatch] = useUser();

  const { register, handleSubmit, errors, control } = useForm();

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
            ref={register({ required: "Tu dois renseigner ton adresse email" })}
            error={!!errors.email}
          />
        </FieldWrapper>
        <Controller
          as={PasswordConfirm}
          name="password"
          control={control}
          rules={{
            validate: ({ password, confirm }) => {
              let errors = [];
              if (password.length < 6) errors.push("too_short");
              if (!password || !password.match(/[A-Z]/))
                errors.push("not_uppercase");
              if (!password || !password.match(/[a-z]/))
                errors.push("not_lowercase");
              if (confirm !== password || confirm === "")
                errors.push("not_confirmed");
              return errors.length ? errors : true;
            },
          }}
        />

        <button type="submit" className="cta">
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default styled(Signup)(() => css``);
